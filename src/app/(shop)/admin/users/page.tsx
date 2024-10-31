// https://tailwindcomponents.com/component/hoverable-table

import Title from '@/components/ui/title/Title';

import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions/user/get-paginated-users';
import UserTable from './ui/UserTable';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Mantenimiento de usuarios' />

      <div className='mb-10'>
        <UserTable users={users} />
      </div>
    </>
  );
}
