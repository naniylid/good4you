import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Cart.module.scss';
import image from './photo.svg';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* поменять название */}
        <title> My cart | Goods4you</title>
      </Helmet>
      <section className='cart'>
        <h2>My cart</h2>
        <div className='cart--block'>
          <div className='cart--block__left'>
            <ul>
              <li>
                <img src={image} alt='Essence Mascara Lash Princess' />
                <div className='info'>
                  <Link to=''>Essence Mascara Lash Princess</Link>
                  <p>$110</p>
                </div>
                <div className='add-item'>
                  <button aria-label='Remove from cart'>
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
                  <p>1 item</p>
                  <button aria-label='Add to cart'>
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
                  <button>Delete</button>
                </div>
              </li>
              <li className='deleted'>
                <img src={image} alt='Essence Mascara Lash Princess' />
                <div className='info'>
                  <a href=''>Essence Mascara Lash Princess</a>
                  <p>$110</p>
                </div>
                <div className='add-item'>
                  <button aria-label='Add to cart'>
                    <svg
                      aria-hidden='true'
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18 6.42906H14.9434L11.7323 0.3125C11.573 0.00866288 11.2275 -0.0905387 10.9605 0.0921531C10.6941 0.274845 10.6079 0.669703 10.7677 0.974189L13.6315 6.42906H4.36849L7.23228 0.974146C7.39214 0.66966 7.3059 0.274802 7.03948 0.0921098C6.77196 -0.0905819 6.42755 0.00861962 6.2677 0.312457L3.05655 6.42902H0V7.71474H1.22086L2.64989 16.4266C2.79929 17.3388 3.49692 18.0005 4.30884 18.0005H13.6912C14.503 18.0005 15.2007 17.3388 15.3495 16.4272L16.7791 7.71474H18C18 7.71474 18 6.42906 18 6.42906ZM14.2437 16.1906C14.1943 16.4944 13.9619 16.7148 13.6911 16.7148H4.30884C4.03803 16.7148 3.80569 16.4945 3.7557 16.19L2.3651 7.71474H15.6349L14.2437 16.1906Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className='cart--block__right'>
            <div className='total-count'>
              <h4>Total count</h4>
              <p>3 items</p>
            </div>
            <div className='without-discount'>
              <h4>Price without discount</h4>
              <p>$700</p>
            </div>
            <div className='total-price'>
              <h4>Total price</h4>
              <p>$590</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
