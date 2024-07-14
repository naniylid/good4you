import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { selectSearchSlice, setSearchValue, setValue } from './slice';
import './Search.module.scss';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { value } = useSelector(selectSearchSlice);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
    updateSearchValue(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      aria-label='Search by title'
      type='text'
      placeholder='Search by title'
      value={value}
      onChange={onChangeInput}
    />
  );
};
