import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Cart.module.scss';

import { restoreProduct, setCartItems, setRemovedItems } from './redux/slice';
import { selectCart } from './redux/selectors';
import { useFetchUserCartQuery } from './redux/cartApi';

import { Button } from '../../components/atoms/Button';
import { LinkTitle } from '../../components/atoms/Link/Link';
import { CartList } from '../../components/molecules/CartItem/CartItem';
import { selectUserId } from '../Login/slice';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userId = useSelector(selectUserId);

  const { data: items = [], isLoading } = useFetchUserCartQuery(userId || -1, {
    skip: userId === undefined,
  });

  useEffect(() => {
    if (Array.isArray(items)) {
      if (JSON.stringify(items) !== JSON.stringify(cart.items)) {
        dispatch(setCartItems(items));
      }

      const storedRemovedItems = JSON.parse(localStorage.getItem('removedItems') || '[]');
      if (JSON.stringify(storedRemovedItems) !== JSON.stringify(cart.removedItems)) {
        dispatch(setRemovedItems(storedRemovedItems));
      }
    }
  }, [items, dispatch, cart.items, cart.removedItems]);

  const handleAddBack = (id: number) => {
    dispatch(restoreProduct(id));
  };

  const isInCart = (itemId: number) => {
    return cart.items.some((item) => item.id === itemId);
  };

  if (isLoading) {
    return <div className='loading'> Loading...</div>;
  }

  const cartItems = Array.isArray(cart.items) ? cart.items : [];

  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
      </Helmet>
      <section className='cart'>
        <h1>My cart</h1>

        {cartItems.length === 0 && cart.removedItems.length === 0 ? (
          <div className='cart__empty'>
            <p>No items</p>
          </div>
        ) : (
          <div className='cart--block'>
            <div className='cart--block__left'>
              <ul>
                {cartItems.map(
                  (item) =>
                    item &&
                    item.quantity > 0 && <CartList key={item.id} item={item} userId={userId} />,
                )}
                {cart.removedItems.map(
                  (item) =>
                    !isInCart(item.id) && (
                      <li key={`removed-item-${item.id}`} className='cart-item deleted'>
                        <img src={item.thumbnail} alt={item.title} loading='lazy' />
                        <div className='info'>
                          <Link to={`/product/${item.id}`}>
                            <LinkTitle text={item.title} />
                          </Link>
                          <p>$ {item.price}</p>
                        </div>
                        <div className='add-item'>
                          <Button onClickAdd={() => handleAddBack(item.id)} />
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </div>

            <div className='cart--block__right'>
              <div className='total-count'>
                <h4>Total count</h4>
                <p>{cart.totalQuantity}</p>
              </div>
              <div className='without-discount'>
                <h4>Price without discount</h4>
                {cart.totalPrice > 0 ? <p>$ {cart.totalPrice.toFixed(2)}</p> : <p>$ 0</p>}
              </div>
              <div className='total-price'>
                <h4>Total price</h4>
                {cart.discountedTotal > 0 ? (
                  <p>$ {cart.discountedTotal.toFixed(2)}</p>
                ) : (
                  <p>$ 0.00</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
