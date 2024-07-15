import React from 'react';
import { useSelector } from 'react-redux';
import './Catalog.module.scss';

import { Search } from '../atoms/Search/index';
import { Skeleton } from './Skeleton';
import { Card } from '../molecules/Card/Card';

import { useAppDispatch } from '../../redux/store';
import { selectSearchSlice } from '../atoms/Search/slice';
import { selectApiSlice } from '../../redux/api/selectors';
import { fetchProducts } from '../../redux/api/slice';

import { selectLimit, setLimit } from './slice';

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  const { searchValue } = useSelector(selectSearchSlice);
  const { items, status } = useSelector(selectApiSlice);

  const { limit } = useSelector(selectLimit);

  const handleShowMore = () => {
    dispatch(setLimit(limit + 12));
  };

  const getProducts = async () => {
    const search = 'search?';
    const q = searchValue;
    dispatch(fetchProducts({ search, q, limit }));
  };

  React.useEffect(() => {
    if (!isSearch.current) {
      getProducts();
    }
    isSearch.current = false;
  }, [searchValue, limit]);

  return (
    <section id='catalog' className='catalog'>
      <h1>Catalog</h1>
      <Search />
      {status === 'error' ? (
        <div>
          <h2>Ошибка загрузки. Попробуйте повторить попытку позже </h2>
        </div>
      ) : (
        <ul className='catalog__list' role='list'>
          {status === 'loading'
            ? [...new Array(12)].map((_, index) => (
                <li key={index}>
                  <Skeleton />
                </li>
              ))
            : items.map((item) => <Card key={item.id} item={item} />)}
        </ul>
      )}
      {items.length >= limit && (
        <div className='show-more'>
          <button onClick={handleShowMore}>Show more</button>
        </div>
      )}
    </section>
  );
};
