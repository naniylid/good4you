import React from 'react';
import './Search.module.scss';
import { searchProductsParamsSlice } from '../../redux/slices/searchProduct/searchProductParamsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useGetSearchProductsQuery } from '../../redux/services/products/products';
import useDebounce from '../../hooks/useDebounce';

interface SearchProps {
  loading?: boolean;
}

const { changeSearchProductsParams } = searchProductsParamsSlice.actions;

export const Search: React.FC<SearchProps> = ({ loading }) => {
  const { name, ...params } = useAppSelector((state) => state.searchProductsParams);
  const dispatch = useAppDispatch();
  const { refetch } = useGetSearchProductsQuery({ name, ...params });
  const [searchValue, setSearchValue] = React.useState(name);
  const searchValueDebounce = useDebounce(searchValue, 350);

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  React.useEffect(() => {
    if (searchValueDebounce !== '') {
      dispatch(
        changeSearchProductsParams({
          ...params,
          name: searchValueDebounce,
          skip: 0,
        }),
      );
    }
  }, [dispatch, searchValueDebounce]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);
    if (value === '') {
      dispatch(
        changeSearchProductsParams({
          ...params,
          name: value,
          skip: 0,
        }),
      );
    }
  }

  return (
    <form action='' onSubmit={onSubmitHandler}>
      <input
        aria-label='Search by title'
        type='text'
        placeholder='Search by title'
        value={searchValue}
        disabled={loading}
        onChange={onChange}
      />
    </form>
  );
};
