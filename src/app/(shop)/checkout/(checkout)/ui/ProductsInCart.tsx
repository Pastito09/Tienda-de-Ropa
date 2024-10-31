'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/cart/cart-store';

import { useEffect, useState } from 'react';

import currencyFormat from '@/utils/currencyFormat';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((prod) => (
        <div key={`${prod.slug}-${prod.size}`} className='flex mb-5'>
          <Image
            src={`/products/${prod.image}`}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            alt={prod.title}
            className='mr-5 rounded'
          />
          <div>
            <span>
              {prod.size} - {prod.title} ({prod.quantity})
            </span>

            <p className='font-bold'>
              {currencyFormat(prod.price * prod.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
