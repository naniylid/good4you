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
import { createCartItem } from '../../../pages/Cart/addToCart';
import { addProduct, minusItem } from '../../../pages/Cart/redux/slice';

export type CardProp = {
  item: Product;
};

export const Card: React.FC<CardProp> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useSelector(selectCart);

  const onClickAdd = (product: Product) => {
    const newCartItem = createCartItem(product, cartItems);
    if (newCartItem) {
      dispatch(addProduct(newCartItem));
    }
  };

  const onClickMinus = (id: number) => {
    dispatch(minusItem(id));
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
            {cartItem && cartItem.count > 0 ? (
              <ButtonControls
                itemCount={cartItem.count}
                stock={item.stock}
                onClickAdd={() => onClickAdd(item)}
                onClickMinus={() => onClickMinus(item.id)}
              />
            ) : (
              <div>
                <Button onClickAdd={() => onClickAdd(item)} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
