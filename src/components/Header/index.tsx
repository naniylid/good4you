import React from 'react';
import './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='header--wrapper'>
        <div className='header--wrapper__background'>Goods4you</div>
        <div className='header--wrapper__content'>
          <h1>
            Any products from famous brands <br /> with worldwide delivery
          </h1>
          <p>
            We sell smartphones, laptops, clothes, shoes <br /> and many other products at low
            prices
          </p>
          <button>Go to shopping</button>
        </div>
      </div>
    </header>
  );
};
