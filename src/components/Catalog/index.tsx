import React from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './Catalog.module.scss';
import { catalogData } from './data';
import { useCart } from '../../context/CartContext';
import image from './image.svg';

export const Catalog: React.FC = () => {
  const { cartItems, addToCart, increaseItem, decreaseItem } = useCart();
  const [itemsToShow, setItemsToShow] = React.useState<number>(12);
  const [search, setSearch] = React.useState('');
  const totalItems = catalogData.length;

  const handleShowMore = () => {
    setItemsToShow((prevItemsToShow) => Math.min(prevItemsToShow + 6, totalItems));
  };

  const handleAddToCart = (index: number) => {
    addToCart(index);
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearch(str);
    }, 150),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
  };

  const filteredCatalogData = catalogData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section id='catalog' className='catalog' aria-labelledby='catalog-heading'>
      <h2 id='catalog-heading'>Catalog</h2>
      <input
        aria-label='Search by title'
        type='text'
        placeholder='Search by title'
        value={search}
        onChange={handleSearchChange}
      />

      <ul className='catalog__list' role='list'>
        {filteredCatalogData.slice(0, itemsToShow).map((item) => (
          <li className='catalog__list--item' key={item.id}>
            <Link to={`/product/${item.id}`} aria-label={`${item.title} details`}>
              <div className='image-container'>
                <img src={image} alt={item.title} loading='lazy' />
                <div className='overlay'>
                  <span>Show details</span>
                </div>
              </div>
              <div className='catalog__list--item__info'>
                <div className='title'>
                  <h4 className={cartItems[item.id] ? 'cart-active' : ''}>{item.title}</h4>
                  <p>${item.price}</p>
                </div>
                <div className='button'>
                  {cartItems[item.id] ? (
                    <div className='cart-controls' onClick={(e) => e.preventDefault()}>
                      <button aria-label='Decrease' onClick={() => decreaseItem(item.id)}>
                        <svg
                          aria-hidden='true'
                          width='18'
                          height='4'
                          viewBox='0 0 30 2'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M29 2L1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447716 0 1 0L29 0C29.5523 0 30 0.447715 30 1C30 1.55228 29.5523 2 29 2Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                      <p>
                        {cartItems[item.id] > 1
                          ? `${cartItems[item.id]} items`
                          : `${cartItems[item.id]} item`}{' '}
                      </p>
                      <button aria-label='Increase' onClick={() => increaseItem(item.id)}>
                        <svg
                          aria-hidden='true'
                          width='18'
                          height='18'
                          viewBox='0 0 30 30'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M29.0323 15.9678L0.967741 15.9678C0.433273 15.9678 0 15.5345 0 15C0 14.4656 0.433272 14.0323 0.967741 14.0323L29.0323 14.0323C29.5667 14.0323 30 14.4656 30 15C30 15.5345 29.5667 15.9678 29.0323 15.9678Z'
                            fill='white'
                          />
                          <path
                            d='M14.0322 29.0323L14.0322 0.967741C14.0322 0.433273 14.4655 0 15 0C15.5344 0 15.9677 0.433272 15.9677 0.967741L15.9677 29.0323C15.9677 29.5667 15.5344 30 15 30C14.4655 30 14.0322 29.5667 14.0322 29.0323Z'
                            fill='white'
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div onClick={(e) => e.preventDefault()}>
                      <button
                        aria-label='Add to cart'
                        onClick={() => {
                          handleAddToCart(item.id);
                        }}
                      >
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
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
        {/* <Skeleton /> */}
      </ul>
      {itemsToShow < totalItems && (
        <div className='show-more'>
          <button onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </section>
  );
};
