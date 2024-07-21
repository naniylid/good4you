import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Card.module.scss';

import { Product } from '../../../redux/api/types';
import { LinkTitle } from '../../atoms/Link/Link';
import { ButtonControls } from '../../atoms/Button/ButtonControls';
import { Button } from '../../atoms/Button';

import { useAppDispatch } from '../../../redux/store';
import { selectCart } from '../../../pages/Cart/redux/selectors';
import { createCartItem, handleAddToCart } from '../../../pages/Cart/addToCart';
import { addProduct, minusItem } from '../../../pages/Cart/redux/slice';
import { selectUserId } from '../../../pages/Login/slice';

export type CardProp = {
  item: Product;
};

export const Card: React.FC<CardProp> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { items: cartItems = [] } = useSelector(selectCart) || { items: [] };
  const userId = useSelector(selectUserId);

  const onClickAdd = () => {
    const cartItem = createCartItem(item, cartItems);

    if (cartItem) {
      dispatch(addProduct(cartItem));
      handleAddToCart(
        {
          ...cartItem,
          quantity: (cartItem.quantity ?? 1) + 1,
        },
        userId,
      );
    }
  };

  const onClickMinus = () => {
    const cartItem = findCartItem(item.id);
    if (cartItem) {
      dispatch(minusItem(item.id));
      handleAddToCart(
        {
          ...cartItem,
          quantity: (cartItem.quantity ?? 1) - 1,
        },
        userId,
      );
    }
  };

  const findCartItem = (id: number) => {
    return cartItems.find((item) => item.id === id);
  };

  const cartItem = findCartItem(item.id);

  return (
    <li className='catalog__list--item'>
      <Link to={`/product/${item.id}`} aria-label={`${item.title} details`}>
        <div className='image-container'>
          <img src={item.images[0]} alt={item.title} loading='lazy' />
          <div className='overlay'>
            <span>Show details</span>
          </div>
        </div>
        <div className='catalog__list--item__info'>
          <div className='title'>
            <LinkTitle text={item.title} />
            <p>${(item.price - item.discountPercentage / 100).toFixed(2)}</p>
          </div>
          <div className='button' onClick={(e) => e.preventDefault()}>
            {cartItem && cartItem.quantity > 0 ? (
              <ButtonControls
                itemCount={cartItem.quantity}
                stock={item.stock}
                onClickAdd={onClickAdd}
                onClickMinus={onClickMinus}
              />
            ) : (
              <div>
                <Button onClickAdd={onClickAdd} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
