import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

function useGetQuantity(id: number) {
  const { cart } = useAppSelector((state) => state.cartByUserId);

  return useMemo(() => {
    return cart?.products.find((product) => product.id === id)?.quantity ?? 0;
  }, [cart, id]);
}

export default useGetQuantity;
