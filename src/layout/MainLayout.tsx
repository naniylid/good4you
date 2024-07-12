import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../pages/Cart/redux/selectors';
import './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  const [isNavExpanded, setIsNavExpanded] = React.useState(false);
  const { totalQuantity } = useSelector(selectCart);

  return (
    <div className='wrapper'>
      <nav className='navigation layout' aria-label='Breadcrumb'>
        <NavLink to='/' aria-current='page'>
          <h3 className='navigation__logo'>Goods4you</h3>
        </NavLink>
        <button
          className='hamburger'
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
          aria-label='Open menu'
        >
          <svg
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill=' #484283'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className={isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'}>
          <ul className='navigation__menu' role='list'>
            <li>
              <Link to='/#catalog'>Catalog</Link>{' '}
            </li>
            <li>
              <Link to='/#faq'>FAQ</Link>{' '}
            </li>
            <li>
              <Link className='cart-wrapper' to='/cart' aria-label='Add to cart'>
                <div className='cart-wrapper__title'>Cart</div>
                <div className='cart-wrapper__item' aria-label='Cart image with counter'>
                  <svg
                    aria-hidden='true'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20 7.14286H16.6038L13.0359 0.34668C12.8589 0.00908289 12.475 -0.101141 12.1784 0.10185C11.8823 0.304841 11.7865 0.743572 11.9641 1.08189L15.1461 7.14286H4.85388L8.03587 1.08184C8.21348 0.743524 8.11767 0.304793 7.82164 0.101802C7.52439 -0.101189 7.14173 0.00903482 6.96411 0.346631L3.39617 7.14281H0V8.57139H1.35651L2.94432 18.2512C3.11033 19.2648 3.88547 20 4.78761 20H15.2124C16.1145 20 16.8896 19.2648 17.055 18.252L18.6434 8.57139H20C20 8.57139 20 7.14286 20 7.14286ZM15.8264 17.989C15.7715 18.3266 15.5133 18.5715 15.2124 18.5715H4.78761C4.4867 18.5715 4.22854 18.3266 4.173 17.9883L2.62789 8.57139H17.3721L15.8264 17.989Z'
                      fill='white'
                    />
                  </svg>

                  {totalQuantity > 0 ? (
                    <p aria-label='Counter' className='count'>
                      {totalQuantity}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
            <li>
              <Link to=''>Johnson Smith</Link>{' '}
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className='footer layout' aria-label='Breadcrumb'>
        <NavLink to='/' aria-current='page'>
          <h3 className='footer__logo'>Goods4you</h3>
        </NavLink>
        <ul className='footer__menu' role='list'>
          <li>
            <Link to='/#catalog'>Catalog</Link>{' '}
          </li>
          <li>
            <Link to='/#faq'>FAQ</Link>{' '}
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default MainLayout;
