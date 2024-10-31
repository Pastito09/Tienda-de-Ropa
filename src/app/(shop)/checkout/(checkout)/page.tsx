import Title from '@/components/ui/title/Title';

import Image from 'next/image';
import Link from 'next/link';
import ProductsInCart from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export default function ChekoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Modificar items</span>
            <Link href='/cart' className='underline mb-5'>
              Editar el carrito
            </Link>

            {/* Items del carrito */}

            <ProductsInCart />
          </div>

          {/* Checkout */}

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
