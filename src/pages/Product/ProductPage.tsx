import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';

import './ProductPage.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import NotFound from '../NotFound';

import { useGetProductByIdQuery } from '../../redux/services/products/products';
import { ProductDescription } from '../../components/productDescription/productDescription';
import { Loading } from '../../components/Loading';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{`${data ? data.title : 'Product'} | Goods4you`}</title>
      </Helmet>
      {data && (
        <section className='product-block'>
          <div className='product-block__photos' aria-label='Image Gallery'>
            {data.images.length < 2 ? (
              <img className='one-image' src={data.images[0]} alt={data.title} loading='lazy' />
            ) : (
              <div className='gallerySliderWrapper'>
                <Swiper
                  loop={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className='mySwiper2'
                >
                  {data.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Slider image ${index + 1}`} loading='lazy' />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={20}
                  slidesPerView={6}
                  freeMode={true}
                  modules={[FreeMode, Thumbs]}
                  className='mySwiper'
                >
                  {data.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Slider image ${index + 1}`} loading='lazy' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
          <ProductDescription product={data} />
        </section>
      )}
    </>
  );
};
