import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from './apiLogin';
import { setToken, setUser } from './slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { data: userData, error } = useGetUserQuery(token || '', {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      if (userData) {
        dispatch(setUser(userData));
        dispatch(setToken(token));
      } else if (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  }, [dispatch, token, userData, error]);
};
