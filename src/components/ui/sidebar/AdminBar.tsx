import { useUIStore } from '@/store/ui/ui-store';
import Link from 'next/link';
import {
  IoPeopleOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

export const AdminBar = () => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <>
      <div className='w-full h-px bg-gray-200 my-10 ' />
      <Link
        href='/admin/products'
        onClick={closeMenu}
        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
      >
        <IoShirtOutline size={30} />
        <span className='ml-3 text-xl'>Productos</span>
      </Link>
      <Link
        href='/admin/orders'
        onClick={closeMenu}
        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
      >
        <IoTicketOutline size={30} />
        <span className='ml-3 text-xl'>Ordenes</span>
      </Link>
      <Link
        href='/admin/users'
        onClick={closeMenu}
        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
      >
        <IoPeopleOutline size={30} />
        <span className='ml-3 text-xl'>Usuarios</span>
      </Link>
    </>
  );
};

export default AdminBar;
