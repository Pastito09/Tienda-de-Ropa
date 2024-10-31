'use server';

import { auth } from '@/auth.config';
import { Size } from '@/interfaces';
import { Address } from '@/interfaces/address.interface';
import prisma from '@/lib/prisma';

interface productToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: productToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  //verificar sesion de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }
  if (productIds.length === 0) {
    return {
      ok: false,
      message: 'No hay articulos en el carrito',
    };
  }
  //obtener la info de los prods
  //Nota se pueden llevar 2 o mas prods con el mismo id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });
  //calcular los montos // emcabezado

  const itemsInOrder = productIds.reduce(
    (count, p) => count + p.quantity,
    0
  );

  // Los totales de tax, subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find(
        (product) => product.id === item.productId
      );
      if (!product)
        throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  //crear la transaccion de la base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. Actualizar el stock de prods

      const updatedProductsPromises = products.map((product) => {
        //acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // NO HACER
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(
        updatedProductsPromises
      );

      // verificar valores negaticos en la existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `${product.title} no tiene inventario suficiente`
          );
        }
      });

      //2. Crear la orden - encabezado - detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find(
                    (producto) => producto.id === p.productId
                  )?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero lanzar error

      // 3. crear la direccion de la orden
      //Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error) {
    return {
      ok: false,
      message: (error as any)?.message,
    };
  }
};
export default placeOrder;
