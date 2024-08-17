import { useMemo } from 'react';
import { useAppSelector } from './useRedux';
import { Product } from '../redux/services/products/types';

function useGetQuantity(id: number) {
  const { cart } = useAppSelector((state) => state.cartByUserId);

  return useMemo(() => {
    return cart?.products.find((product: Product) => product.id === id)?.quantity ?? 0;
  }, [cart, id]);
}

export default useGetQuantity;
