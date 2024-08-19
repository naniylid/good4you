import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { useAddProduct } from '../../hooks/useAddProduct';
import useGetQuantity from '../../hooks/useGetCount';
import { EmptyStar, FillStar } from '../../pages/Product/ratingStar';
import { Product } from '../../redux/services/products/types';
import { productToProductCart } from '../../utils';
import { ButtonControls } from '../ButtonControls';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const quantity = useGetQuantity(product.id);
  const { addProductHandle } = useAddProduct(product);

  return (
    <div className='product-block__info'>
      <h1>{product.title}</h1>
      <div className='product-block__info--wrapper'>
        <div className='rating'>
          <Rating
            fillIcon={<FillStar />}
            emptyIcon={<EmptyStar />}
            initialValue={product.rating}
            readonly
          />
        </div>
        <div className='category'>
          <p>{product.tags.join(', ')}</p>
        </div>
      </div>
      <h4>In Stock - Only {product.stock} left!</h4>
      <p className='about-product'>{product.description}</p>
      <p className='delivery-date'>{product.warrantyInformation}</p>
      <p className='delivery-date'>{product.shippingInformation}</p>
      <div className='order--block'>
        <div className='order--block__left'>
          <div className='order--block__left--price'>
            <h3>${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}</h3>
            <p>${product.price}</p>
          </div>
          <div className='order--block__left--discount'>
            <p>
              Your discount: <strong>{product.discountPercentage}%</strong>
            </p>
          </div>
        </div>
        <div className='order--block__button'>
          {quantity === 0 ? (
            <button aria-label='Add to cart' onClick={addProductHandle}>
              Add to cart
            </button>
          ) : (
            <ButtonControls
              product={productToProductCart(product)}
              quantity={quantity}
              stock={product.stock}
            />
          )}
        </div>
      </div>
    </div>
  );
};
