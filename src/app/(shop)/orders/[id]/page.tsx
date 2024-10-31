import getOrderById from '@/actions/order/get-order-id';
import OrderStatus from '@/components/orders/OrderStatus';
import { PayPalButton } from '@/components/ui/paypal/PayPalButton';
import Title from '@/components/ui/title/Title';

import currencyFormat from '@/utils/currencyFormat';

import Image from 'next/image';

import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  //todo: llamar al server action
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items del carrito */}

            {order!.OrderItem.map((prod) => (
              <div
                key={`${prod.product.slug}-${prod.size}`}
                className='flex mb-5'
              >
                <Image
                  src={`/products/${prod.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  alt={prod.product.title}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{prod.product.title}</p>
                  <p>
                    ${prod.price} x {prod.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal:{' '}
                    {currencyFormat(prod.price * prod.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>
              Dirección de entrega
            </h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {order?.OrderAddress?.firstName}{' '}
                {order?.OrderAddress?.lastName}
              </p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.address2}</p>
              <p>{order?.OrderAddress?.city}</p>
              <p>{order?.OrderAddress?.countryId}</p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>Tel: {order?.OrderAddress?.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {order?.itemsInOrder}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className='text-right'>
                {currencyFormat(order!.tax)}
              </span>

              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order.isPaid ?? false} />
              ) : (
                <PayPalButton
                  orderId={order!.id}
                  amount={order!.total}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
