import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CartItem.module.scss';

import { LinkTitle } from '../../atoms/Link/Link';
import { ButtonControls } from '../../atoms/Button/ButtonControls';
import { CartItem } from '../../../pages/Cart/redux/types';
import { addProduct, minusItem, removeProduct } from '../../../pages/Cart/redux/slice';
import { selectApiSlice } from '../../../redux/api/selectors';
import { useAppDispatch } from '../../../redux/store'; // Assuming this is the correct path

export type CartItemProp = {
  item: CartItem;
  userId?: number; // Добавляем userId как опциональное свойство
  updateCart?: (args: { userId: number; products: CartItem[] }) => Promise<any>; // Добавляем updateCart как опциональное свойство
};

export const CartList: React.FC<CartItemProp> = ({ item, userId, updateCart }) => {
  const dispatch = useAppDispatch();
  const { items: products } = useSelector(selectApiSlice);

  const onClickMinus = (id: number) => {
    dispatch(minusItem(id));
  };

  const onClickRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleAddToCart = async (cartItem: CartItem) => {
    if (updateCart && userId) {
      try {
        await updateCart({ userId, products: [cartItem] });
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
    } else {
      console.error('User ID or updateCart function is not available');
    }
  };

  const onClickAdd = (item: CartItem) => {
    dispatch(addProduct(item));
    handleAddToCart(item);
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
        itemCount={item.quantity}
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
