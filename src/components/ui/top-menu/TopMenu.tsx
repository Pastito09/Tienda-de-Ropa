'use client';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store/cart/cart-store';
import { useUIStore } from '@/store/ui/ui-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) =>
    state.getTotalItems()
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span
            className={`${titleFont.className} antialiased font-bold`}
          >
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/men'
        >
          Hombres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/women'
        >
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/kid'
        >
          Niñes
        </Link>
      </div>

      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
          className='mx-2'
        >
          <div className='relative'>
            {loaded && totalItemsInCart > 0 && (
              <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 fade-in bg-blue-700 text-white'>
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>
        <button
          onClick={() => openMenu()}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
