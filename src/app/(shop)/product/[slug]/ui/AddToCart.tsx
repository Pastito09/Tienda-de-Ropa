'use client';

import QuantitySelector from '@/components/product/quantity-selector/QuantitySelector';
import SizeSelector from '@/components/product/size-selector/SizeSelector';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart-store';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(
    (state) => state.addProductToCart
  );

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    //console.log({ size, quantity });

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className='mt-2 text-red-500 fade-in'>
          Debe seleccionar una talla *
        </span>
      )}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        avaliableSizes={product.sizes}
        onSizeChanged={setSize} // ES LO MISMO QUE: (size) => setSize(size) por que al enviar el argunmento recibido a la funcion se puede simplificar
      />

      {/* Slector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />

      {/* Button */}
      <button onClick={addToCart} className='btn-primary my-5'>
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;
