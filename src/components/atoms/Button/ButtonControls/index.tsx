import React from 'react';
import { ProductCart } from '../../../../redux/services/cartById/types';
import { cartByUserIdSlice } from '../../../../redux/slices/cartByUserIdSlice';
import { notificationErrorSlice } from '../../../../redux/slices/notificationError';
import { useUpdateCartByUserIdMutation } from '../../../../redux/services/cartById/cartById';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { getErrorMsg } from '../../../../utils';

export interface ButtonControlsProps {
  product: ProductCart;
  quantity: number;
  stock: number;
}

const { getCart } = cartByUserIdSlice.actions;
const { addErrorToast } = notificationErrorSlice.actions;

export const ButtonControls: React.FC<ButtonControlsProps> = ({ product, stock, quantity }) => {
  const dispatch = useAppDispatch();
  const [updateCartByUserId, { data, isError, error, isLoading }] = useUpdateCartByUserIdMutation();
  const { cart } = useAppSelector((state) => state.cartByUserId);

  function incrementCounter() {
    updateCartByUserId({
      id: cart?.id ?? 0,
      products:
        cart?.products.map((item) => {
          if (item.id === product.id) {
            return { id: item.id, quantity: item.quantity + 1 };
          }
          return { id: item.id, quantity: item.quantity };
        }) ?? [],
    });
  }

  function decrementCounter() {
    if (quantity > 1) {
      updateCartByUserId({
        id: cart?.id ?? 0,
        products:
          cart?.products.map((item) => {
            if (item.id === product.id) {
              return { id: item.id, quantity: item.quantity - 1 };
            }
            return { id: item.id, quantity: item.quantity };
          }) ?? [],
      });
    } else {
      updateCartByUserId({
        id: cart?.id ?? 0,
        products:
          cart?.products.filter((item) => {
            if (item.id !== product.id) {
              return { id: item.id, quantity: item.quantity };
            }
          }) ?? [],
      });
    }
  }

  React.useEffect(() => {
    if (data) {
      dispatch(getCart(data));
    }
  }, [dispatch, data]);

  React.useEffect(() => {
    if (isError) {
      dispatch(addErrorToast({ message: getErrorMsg(error) ?? '' }));
    }
  }, [dispatch, error, isError]);

  return (
    <div className='cart-controls'>
      <button
        className='decrease'
        aria-label='Decrease'
        disabled={isLoading}
        onClick={decrementCounter}
      >
        <svg
          aria-hidden='true'
          width='18'
          height='3'
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
        {quantity} {quantity === 1 ? 'item' : 'items'}
      </p>
      <button
        aria-label='Increase'
        disabled={stock === quantity || isLoading}
        onClick={incrementCounter}
      >
        <svg
          aria-hidden='true'
          width='18'
          height='18'
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
  );
};
