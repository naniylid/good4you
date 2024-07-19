import { Product } from '../../redux/api/types';
import { CartItem } from './redux/types';

export const createCartItem = (product: Product, cartItems: CartItem[]): CartItem | null => {
  if (!product) return null;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const itemCount = cartItem ? cartItem.quantity : 0;

  if (itemCount >= product.stock) return null;

  const newCartItem: CartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: itemCount + 1,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    stock: product.stock,
  };

  return newCartItem;
};
