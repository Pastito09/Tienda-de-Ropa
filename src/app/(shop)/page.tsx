export const revalidate = 60;

import ProductGrid from '@/components/products/product-grid/ProductGrid';
import Title from '@/components/ui/title/Title';

import getPaginatedProductWithImages from '../../actions/product/product-pagination';
import { redirect } from 'next/navigation';
import Pagination from '@/components/ui/pagination/Pagination';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {
    products,
    currentPage,
    totalPages,
  } = await getPaginatedProductWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title={'Home Page'}
        subTitle='Todos los prod'
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
