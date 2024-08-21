import React from 'react';
import { Helmet } from 'react-helmet-async';

import './Cart.module.scss';

import { CartItem } from '../../components/CartItem/CartItem';
import useAuth from '../../hooks/useAuth';
import { useGetCartByUserIdQuery } from '../../redux/services/cartById/cartById';
import { useAppSelector } from '../../hooks/useRedux';

export const Cart: React.FC = () => {
  const id = useAuth();
  const { isLoading, isError } = useGetCartByUserIdQuery(id ?? 0);
  const { cart } = useAppSelector((state) => state.cartByUserId);

  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
      </Helmet>
      <section className='cart'>
        <h1>My cart</h1>

        {!isLoading && !isError && !cart?.products.length ? (
          <div className='cart__empty'>
            <p>No items</p>
          </div>
        ) : (
          <div className='cart--block'>
            <div className='cart--block__left'>
              <ul>
                {cart?.products.map((product) => <CartItem product={product} key={product.id} />)}
              </ul>
            </div>

            <div className='cart--block__right'>
              <div className='total-count'>
                <h4>Total count</h4>
                <p>{cart?.totalQuantity}</p>
              </div>
              <div className='without-discount'>
                <h4>Price without discount</h4>
                {<p>${cart?.total.toFixed(2)}</p>}
              </div>
              <div className='total-price'>
                <h4>Total price</h4>
                <p>${cart?.discountedTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
        {isError && <p>Loading error </p>}
      </section>
    </>
  );
};
