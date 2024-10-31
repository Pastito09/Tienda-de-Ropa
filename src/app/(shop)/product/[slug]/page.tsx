export const revalidate = 604800; // 7 dias

import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import QuantitySelector from '@/components/product/quantity-selector/QuantitySelector';
import SizeSelector from '@/components/product/size-selector/SizeSelector';
import ProductMobileSlideshow from '@/components/product/slideshow/ProductMobileSlideshow';
import ProductSlideshow from '@/components/product/slideshow/ProductSlideshow';
import StockLabel from '@/components/product/stock-label/StockLabel';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';

import { notFound } from 'next/navigation';
import AddToCart from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title,
    description: product?.description ?? '',
    openGraph: {
      title: product?.title,
      description: product?.description ?? '',
      //images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* SLideshow */}
      <div className='cols-span-1 md:col-span-2'>
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>
      {/* Detalles */}
      <div className='col-span-1 px-5'>
        <StockLabel slug={product.slug} />

        <h1
          className={` ${titleFont.className} antialiased font-bold text-xl`}
        >
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-ligth'>{product.description}</p>
      </div>
    </div>
  );
}
