import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.module.scss';

import { LinkTitle } from '../../atoms/Link/Link';
import { ButtonControls } from '../../atoms/Button/ButtonControls';
import { CartItem } from '../../../pages/Cart/redux/types';
import { addProduct, minusItem, removeProduct } from '../../../pages/Cart/redux/slice';
import { selectApiSlice } from '../../../redux/api/selectors';

export type CartItemProp = {
  item: CartItem;
};

export const CartList: React.FC<CartItemProp> = ({ item }) => {
  const dispatch = useDispatch();
  const { items: products } = useSelector(selectApiSlice);

  const onClickMinus = (id: number) => {
    dispatch(minusItem(id));
  };

  const onClickAdd = (item: CartItem) => {
    dispatch(addProduct(item));
  };

  const onClickRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <li className='cart-item' key={`cart-item-${item.id}`}>
      <img src={item.thumbnail} alt={item.title} loading='lazy' />
      <div className='info'>
        <Link to={`/product/${item.id}`}>
          <LinkTitle text={item.title} />
        </Link>
        <p>$ {item.price}</p>
      </div>
      <ButtonControls
        itemCount={item.count}
        stock={products.find((product) => product.id === item.id)?.stock || 0}
        onClickMinus={() => onClickMinus(item.id)}
        onClickAdd={() => onClickAdd(item)}
      />
      <div className='delete'>
        <button onClick={() => onClickRemove(item.id)}>Delete</button>
      </div>
    </li>
  );
};
