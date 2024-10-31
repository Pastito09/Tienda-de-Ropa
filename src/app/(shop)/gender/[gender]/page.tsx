export const revalidate = 60;

import getPaginatedProductWithImages from '@/actions/product/product-pagination';
import ProductGrid from '@/components/products/product-grid/ProductGrid';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/title/Title';
import { Gender } from '@prisma/client';

import { redirect } from 'next/navigation';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({
  params,
  searchParams,
}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { gender } = params;

  const {
    products,
    currentPage,
    totalPages,
  } = await getPaginatedProductWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niñes',
    unisex: 'Unisex',
  };
  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <div>
      <Title title={labels[gender]} className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
