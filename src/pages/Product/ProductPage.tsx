import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating';

import './ProductPage.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import NotFound from '../NotFound';
import { addProduct, minusItem } from '../Cart/redux/slice';
import { createCartItem } from '../Cart/addToCart';
import { selectCart } from '../Cart/redux/selectors';
import { useGetProductByIdQuery } from './getProductApi';
import { EmptyStar, FillStar } from './ratingStar';
import { Product } from '../../redux/api/types';

export const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const { items } = useSelector(selectCart);
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);

  const decreaseItem = (productId: number) => {
    const cartItem = items.find((item) => item.id === productId);
    if (cartItem && cartItem.count > 0) {
      dispatch(minusItem(productId));
    }
  };

  const onClickAdd = (product: Product) => {
    const newCartItem = createCartItem(product, items);
    if (newCartItem) {
      dispatch(addProduct(newCartItem));
    }
  };

  if (isLoading) return <div className='loading'>Loading...</div>;

  if (error) {
    return <NotFound />;
  }

  const itemCount = items.find((item) => item.id === product?.id)?.count || 0;

  return (
    <>
      <Helmet>
        <title>{`${product ? product.title : 'Product'} | Goods4you`}</title>
      </Helmet>
      {product ? (
        <section className='product-block'>
          <div className='product-block__photos' aria-label='Image Gallery'>
            {product.images.length < 2 ? (
              <img
                className='one-image'
                src={product.images[0]}
                alt={product.title}
                loading='lazy'
              />
            ) : (
              <div className='gallerySliderWrapper'>
                <Swiper
                  loop={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className='mySwiper2'
                >
                  {product.images.map((image, index) => (
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
                  {product.images.map((image, index) => (
                    <>
                      {' '}
                      <SwiperSlide key={index}>
                        <img src={image} alt={`Slider image ${index + 1}`} loading='lazy' />
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
          <div className='product-block__info'>
            <h2>{product.title}</h2>
            <div className='product-block__info--wrapper'>
              <div className='rating'>
                <Rating
                  fillIcon={<FillStar />}
                  emptyIcon={<EmptyStar />}
                  initialValue={product.rating}
                  readonly
                />
              </div>
              <div className='category'>
                <p>{product.tags.join(', ')}</p>
              </div>
            </div>
            <h4>In Stock - Only {product.stock} left!</h4>
            <p className='about-product'>{product.description}</p>
            <p className='delivery-date'>{product.warrantyInformation}</p>
            <p className='delivery-date'>{product.shippingInformation}</p>
            <div className='order--block'>
              <div className='order--block__left'>
                <div className='order--block__left--price'>
                  <h3>
                    ${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}
                  </h3>
                  <p>${product.price}</p>
                </div>
                <div className='order--block__left--discount'>
                  <p>
                    Your discount: <strong>{product.discountPercentage}%</strong>
                  </p>
                </div>
              </div>
              <div className='order--block__button'>
                {itemCount > 0 ? (
                  <div className='cart-controls'>
                    <button aria-label='Decrease' onClick={() => decreaseItem(product.id)}>
                      <svg
                        aria-hidden='true'
                        width='30'
                        height='2'
                        viewBox='0 0 30 2'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M29 2L1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447716 0 1 0L29 0C29.5523 0 30 0.447715 30 1C30 1.55228 29.5523 2 29 2Z'
                          fill='white'
                        />
                      </svg>
                    </button>
                    <p>
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                    <button
                      aria-label='Increase'
                      disabled={itemCount >= product.stock}
                      onClick={() => onClickAdd(product)}
                    >
                      <svg
                        aria-hidden='true'
                        width='30'
                        height='30'
                        viewBox='0 0 30 30'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M29.0323 15.9678L0.967741 15.9678C0.433273 15.9678 0 15.5345 0 15C0 14.4656 0.433272 14.0323 0.967741 14.0323L29.0323 14.0323C29.5667 14.0323 30 14.4656 30 15C30 15.5345 29.5667 15.9678 29.0323 15.9678Z'
                          fill='white'
                        />
                        <path
                          d='M14.0322 29.0323L14.0322 0.967741C14.0322 0.433273 14.4655 0 15 0C15.5344 0 15.9677 0.433272 15.9677 0.967741L15.9677 29.0323C15.9677 29.5667 15.5344 30 15 30C14.4655 30 14.0322 29.5667 14.0322 29.0323Z'
                          fill='white'
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    aria-label='Add to cart'
                    onClick={() => {
                      onClickAdd(product);
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
};
