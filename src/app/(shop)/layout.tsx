import Footer from '@/components/ui/footer/Footer';
import { Sidebar } from '@/components/ui/sidebar/Sidebar';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen flex'>
      <TopMenu />
      <Sidebar />
      <div className='flex-1 px-0 sm:px-10'>{children}</div>
      <Footer />
    </main>
  );
}
