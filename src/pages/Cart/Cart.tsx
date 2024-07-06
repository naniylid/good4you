import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Cart.module.scss';
import image from './photo.svg';
import { catalogData } from '../../components/Catalog/data';
import { useCart } from '../../context/CartContext';

export const Cart: React.FC = () => {
  const [deletedItems, setDeletedItems] = React.useState<number[]>([]);
  const { cartItems, increaseItem, decreaseItem } = useCart();

  const cartProducts = Object.keys(cartItems)
    .map((id) => ({
      ...catalogData.find((product) => product.id === Number(id)),
      id: Number(id),
    }))
    .filter((product) => !deletedItems.includes(product.id));

  // const totalPrice = cartProducts.reduce((acc, product) => {
  //   if (product.price !== undefined) {
  //     return acc + product.price * cartItems[product.id];
  //   }
  //   return acc;
  // }, 0);

  const handleDelete = (id: number) => {
    setDeletedItems([...deletedItems, id]);
  };

  const handleAddBack = (id: number) => {
    increaseItem(id);
    setDeletedItems(deletedItems.filter((itemId) => itemId !== id));
  };

  return (
    <>
      <Helmet>
        <title> My cart | Goods4you</title>
      </Helmet>
      <section className='cart'>
        <h2>My cart</h2>
        {cartProducts.length === 0 && deletedItems.length === 0 ? (
          <p className='cart__empty'>Your cart is empty</p>
        ) : (
          <div className='cart--block'>
            <div className='cart--block__left'>
              <ul>
                {cartProducts.map((product) => (
                  <li key={product.id}>
                    <img src={image} alt={product.title} loading='lazy' />
                    <div className='info'>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                      <p>${product.price}</p>
                    </div>
                    <div className='add-item'>
                      <button
                        aria-label='Remove from cart'
                        onClick={() => decreaseItem(product.id)}
                      >
                        <svg
                          aria-hidden='true'
                          width='18'
                          height='4'
                          viewBox='0 0 18 4'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16.5 3.5L1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5L16.5 0.5C17.3284 0.5 18 1.17157 18 2C18 2.82843 17.3284 3.5 16.5 3.5Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                      <p>
                        {cartItems[product.id] > 1
                          ? `${cartItems[product.id]} items`
                          : `${cartItems[product.id]} item`}
                      </p>
                      <button aria-label='Add to cart' onClick={() => increaseItem(product.id)}>
                        <svg
                          aria-hidden='true'
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z'
                            fill='white'
                          />
                          <path
                            d='M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='delete'>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                  </li>
                ))}
                {deletedItems.map((id) => {
                  const product = catalogData.find((product) => product.id === id);
                  return (
                    <li key={id} className='deleted'>
                      <img src={image} alt={product?.title} loading='lazy' />
                      <div className='info'>
                        <Link to={`/product/${product?.id}`}>{product?.title}</Link>
                        <p>${product?.price}</p>
                      </div>
                      <div className='add-item'>
                        <button aria-label='Add to cart' onClick={() => handleAddBack(id)}>
                          <svg
                            aria-hidden='true'
                            width='18'
                            height='18'
                            viewBox='0 0 18 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z'
                              fill='white'
                            />
                            <path
                              d='M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z'
                              fill='white'
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='cart--block__right'>
              <div className='total-count'>
                <h4>Total count</h4>
                {/* <p>{totalCount > 1 ? `${totalCount} items` : `${totalCount} item`} </p> */}
                <p>3 items</p>
              </div>
              <div className='without-discount'>
                <h4>Price without discount</h4>
                {/* <p>${totalPrice}</p> */}
                <p>$700</p>
              </div>
              <div className='total-price'>
                <h4>Total price</h4>
                {/* <p>${totalPrice * 0.85}</p> */}
                <p>$590</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
