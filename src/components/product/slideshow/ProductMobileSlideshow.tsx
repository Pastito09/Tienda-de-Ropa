'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import ProductImage from '../producrt-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({
  images,
  title,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100wh',
          height: '500px',
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              height={500}
              width={600}
              alt={title}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductMobileSlideshow;
