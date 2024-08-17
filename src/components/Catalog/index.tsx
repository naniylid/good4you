import React from 'react';
import './Catalog.module.scss';

import { Search } from '../atoms/Search/index';
import { Skeleton } from './Skeleton';
import { Card } from '../molecules/Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useGetSearchProductsQuery } from '../../redux/services/products/products';
import { searchProductsParamsSlice } from '../../redux/slices/searchProduct/searchProductParamsSlice';

const { changeSearchProductsParams } = searchProductsParamsSlice.actions;

export const Catalog: React.FC = () => {
  const { name, limit, skip } = useAppSelector((state) => state.searchProductsParams);
  const { data, isError, isLoading, isFetching } = useGetSearchProductsQuery({
    name,
    limit,
    skip,
  });
  const dispatch = useAppDispatch();

  return (
    <section id='catalog' className='catalog'>
      <h1>Catalog</h1>
      <Search loading={isLoading} />
      {isError || isLoading ? (
        <div>
          <h2>Loading error. Please try again later</h2>
        </div>
      ) : (
        <ul className='catalog__list' role='list'>
          {!isLoading &&
            data?.products.map((product, i) => (
              <Card product={product} key={`${product.id}-${i}`} />
            ))}
          {isFetching && Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />)}
        </ul>
      )}
      {!isLoading && data && skip + 9 < data?.total && (
        <div className='show-more'>
          <button
            onClick={() => {
              dispatch(changeSearchProductsParams({ name, limit, skip: skip + 9 }));
            }}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
};
