import React from 'react';
import './Button.module.scss';

export type ButtonProp = {
  onClick: () => void;
};

export const Button: React.FC<ButtonProp> = ({ onClick }) => {
  return (
    <button className='add-button' aria-label='Add to cart' onClick={onClick}>
      <svg
        aria-hidden='true'
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18 6.42857H14.9434L11.7323 0.312012C11.573 0.0081746 11.2275 -0.0910269 10.9605 0.0916648C10.6941 0.274357 10.6079 0.669215 10.7677 0.973701L13.6315 6.42857H4.36849L7.23228 0.973658C7.39214 0.669172 7.3059 0.274313 7.03948 0.0916215C6.77196 -0.0910702 6.42755 0.00813134 6.2677 0.311968L3.05655 6.42853H0V7.71425H1.22086L2.64989 16.4261C2.79929 17.3383 3.49692 18 4.30884 18H13.6912C14.503 18 15.2007 17.3383 15.3495 16.4268L16.7791 7.71425H18C18 7.71425 18 6.42857 18 6.42857ZM14.2437 16.1901C14.1943 16.4939 13.9619 16.7143 13.6911 16.7143H4.30884C4.03803 16.7143 3.80569 16.494 3.7557 16.1895L2.3651 7.71425H15.6349L14.2437 16.1901Z'
          fill='white'
        />
      </svg>
    </button>
  );
};
