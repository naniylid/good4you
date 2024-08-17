import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

function useAuth() {
  const { id } = useAppSelector((state) => state.auth);

  return useMemo(() => id, [id]);
}

export default useAuth;
