'use client';
import { logout } from '@/actions/auth/logout';
import { useUIStore } from '@/store/ui/ui-store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogIn,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import AdminBar from './AdminBar';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const onLogout = async () => {
    await logout();
    window.location.replace('/');
    closeMenu();
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
          onClick={closeMenu}
        />
      )}

      {/* SideMenu*/}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={() => closeMenu()}
        />
        {/*input*/}
        <div className='relative mt-14'>
          <IoSearchOutline
            size={20}
            className='absolute top-1 left-2'
          />
          <input
            type='text'
            placeholder='Buscar'
            name='buscar'
            className='w-full bg-gray-50 rounded pl-10  border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={() => closeMenu()}
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>
            <Link
              href='/orders'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={() => {
              onLogout();
            }}
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Salir</span>
          </button>
        )}
        {!isAuthenticated && (
          <Link
            href='/auth/login'
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={() => closeMenu()}
          >
            {' '}
            <IoLogIn size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        {session?.user.role === 'admin' && <AdminBar />}
      </nav>
    </div>
  );
};
