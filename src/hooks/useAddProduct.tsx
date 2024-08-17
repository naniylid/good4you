import {cartByUserIdSlice} from '@app/store/slices/cartByUserId/cartByUserIdSlice.ts';
import {notificationErrorSlice} from '@app/store/slices/notificationError/notificationError.ts';
import {Product} from '@app/store/services/products/types';
import {useAppDispatch, useAppSelector} from '@app/hooks/useRedux.ts';
import {useUpdateCartByUserIdMutation} from '@app/store/services/cartByUserId/cartByUserIdApi.ts';
import {getErrorMsg, productToProductCart} from '@app/utils';
import {useEffect} from 'react';

const {getCart} = cartByUserIdSlice.actions;
const {addErrorToast} = notificationErrorSlice.actions;

export function useAddProduct(product: Product) {
    const dispatch = useAppDispatch();
    const [updateCartByUserId, {isError, error, data, isLoading}] = useUpdateCartByUserIdMutation();
    const {cart} = useAppSelector(state => state.cartByUserId);

    function addProductHandle() {
        if(product) {
            updateCartByUserId(
                {
                    id: cart?.id ?? 0,
                    products: [...(cart?.products ?? []), productToProductCart(product, 1)],
                    merge: false,
                });
        }
    }

    useEffect(() => {
        if(isError) {
            dispatch(addErrorToast({message: getErrorMsg(error) ?? ''}));
        }
    }, [dispatch, isError, error]);

    useEffect(() => {
        if(data) {
            dispatch(getCart(data));
        }
    }, [dispatch, data]);

    return {addProductHandle, isLoading};
}