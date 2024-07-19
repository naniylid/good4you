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
import { ButtonControls } from '../../components/atoms/Button/ButtonControls';
import { addProduct, minusItem } from '../Cart/redux/slice';
import { createCartItem } from '../Cart/addToCart';
import { selectCart } from '../Cart/redux/selectors';
import { useGetProductByIdQuery } from './getProductApi';
import { EmptyStar, FillStar } from './ratingStar';
import { Product } from '../../redux/api/types';
import { selectUserId } from '../Login/slice';
import { useUpdateCartMutation } from '../Cart/redux/cartApi';

export const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const { items } = useSelector(selectCart);
  const userId = useSelector(selectUserId);

  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);
  const [updateCart] = useUpdateCartMutation();

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      if (userId) {
        const product = items.find((item) => item.id === productId);

        if (product) {
          await updateCart({
            userId,
            products: [
              {
                id: productId,
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage,
                thumbnail: product.thumbnail,
                quantity,
              },
            ],
          }).unwrap();
        }
      } else {
        console.error('User ID is not available');
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const decreaseItem = (productId: number) => {
    const cartItem = items.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 0) {
      dispatch(minusItem(productId));
      handleAddToCart(productId, cartItem.quantity - 1);
    }
  };

  const onClickAdd = (product: Product) => {
    const newCartItem = createCartItem(product, items);
    if (newCartItem) {
      dispatch(addProduct(newCartItem));
      handleAddToCart(newCartItem.id, newCartItem.quantity + 1);
    }
  };

  if (isLoading) return <div className='loading'>Loading...</div>;

  if (error) return <NotFound />;

  const itemCount = items.find((item) => item.id === product?.id)?.quantity || 0;

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
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Slider image ${index + 1}`} loading='lazy' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
          <div className='product-block__info'>
            <h1>{product.title}</h1>
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
                  <ButtonControls
                    itemCount={itemCount}
                    stock={product.stock}
                    onClickAdd={() => onClickAdd(product)}
                    onClickMinus={() => decreaseItem(product.id)}
                  />
                ) : (
                  <button aria-label='Add to cart' onClick={() => onClickAdd(product)}>
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
