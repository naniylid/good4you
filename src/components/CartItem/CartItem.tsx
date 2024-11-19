import React from 'react';
import { Link } from 'react-router-dom';

import './CartItem.module.scss';

import { LinkTitle } from '../ui/Link/Link';
import { ButtonControls } from '../ButtonControls';
import { ProductCart } from '../../redux/services/cartById/types';
import { cartByUserIdSlice } from '../../redux/slices/cartByUserIdSlice';
import useGetQuantity from '../../hooks/useGetCount';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useUpdateCartByUserIdMutation } from '../../redux/services/cartById/cartById';
import { useGetProductByIdQuery } from '../../redux/services/products/products';
import { Loading } from '../ui/Loading';

export type CartItemProp = {
    product: ProductCart;
};

const { getCart } = cartByUserIdSlice.actions;

export const CartItem: React.FC<CartItemProp> = ({ product }) => {
    const quantity = useGetQuantity(product.id);
    const dispatch = useAppDispatch();
    const [updateCartByUserId, { data, isLoading }] = useUpdateCartByUserIdMutation();
    const { cart } = useAppSelector((state) => state.cartByUserId);
    const { data: dataProduct } = useGetProductByIdQuery(product.id);

    function deleteProduct() {
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

    React.useEffect(() => {
        if (data) {
            dispatch(getCart(data));
        }
    }, [dispatch, data]);

    return isLoading ? (
        <Loading />
    ) : (
        <li className='cart-item' key={`cart-item-${product.id}`}>
            <img src={product.thumbnail} alt={product.title} loading='lazy' />
            <div className='info'>
                <Link to={`/product/${product.id}`}>
                    <LinkTitle text={product.title} />
                </Link>
                <p>${product.price}</p>
            </div>
            <ButtonControls product={product} quantity={quantity} stock={dataProduct?.stock ?? 0} />
            <div className='delete'>
                <button onClick={deleteProduct}>Delete</button>
            </div>
        </li>
    );
};
