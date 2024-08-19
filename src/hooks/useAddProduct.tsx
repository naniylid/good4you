import { cartByUserIdSlice } from '../redux/slices/cartByUserIdSlice';
import { notificationErrorSlice } from '../redux/slices/notificationError';
import { Product } from '../redux/services/products/types';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useUpdateCartByUserIdMutation } from '../redux/services/cartById/cartById';
import { productToProductCart, getErrorMsg } from '../utils';
import { useEffect } from 'react';

const { getCart } = cartByUserIdSlice.actions;
const { addErrorToast } = notificationErrorSlice.actions;

export function useAddProduct(product: Product) {
  const dispatch = useAppDispatch();
  const [updateCartByUserId, { isError, error, data, isLoading }] = useUpdateCartByUserIdMutation();
  const { cart } = useAppSelector((state) => state.cartByUserId);

  function addProductHandle() {
    if (product) {
      updateCartByUserId({
        id: cart?.id ?? 0,
        products: [...(cart?.products ?? []), productToProductCart(product, 1)],
        merge: false,
      });
    }
  }

  useEffect(() => {
    if (isError) {
      dispatch(addErrorToast({ message: getErrorMsg(error) ?? '' }));
    }
  }, [dispatch, isError, error]);

  useEffect(() => {
    if (data) {
      dispatch(getCart(data));
    }
  }, [dispatch, data]);

  return { addProductHandle, isLoading };
}
