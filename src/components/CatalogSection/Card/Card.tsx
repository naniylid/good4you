import React from 'react';
import { Link } from 'react-router-dom';

import './Card.module.scss';

import { Product } from '../../../redux/services/products/types';
import { LinkTitle } from '../../ui/Link/Link';
import { ButtonControls } from '../../ButtonControls/index';
import { Button } from '../../ui/Button/index';
import useGetQuantity from '../../../hooks/useGetCount';
import { useAddProduct } from '../../../hooks/useAddProduct';
import { productToProductCart } from '../../../utils';

export type CardProp = {
    product: Product;
};

export const Card: React.FC<CardProp> = ({ product }) => {
    const quantity = useGetQuantity(product.id);
    const { addProductHandle } = useAddProduct(product);

    return (
        <li className='catalog__list--item'>
            <Link to={`/product/${product.id}`} aria-label={`${product.title} details`}>
                <div className='image-container'>
                    <img src={product.images[0]} alt={product.title} loading='lazy' />
                    <div className='overlay'>
                        <span>Show details</span>
                    </div>
                </div>
                <div className='catalog__list--item__info'>
                    <div className='title'>
                        <LinkTitle text={product.title} />
                        <p>${(product.price - product.discountPercentage / 100).toFixed(2)}</p>
                    </div>
                    <div className='button' onClick={(e) => e.preventDefault()}>
                        {quantity > 0 ? (
                            <ButtonControls
                                product={productToProductCart(product)}
                                quantity={quantity}
                                stock={product.stock}
                            />
                        ) : (
                            <div>
                                <Button onClick={addProductHandle} />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </li>
    );
};
