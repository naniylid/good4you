import { Product } from '../../redux/api/types';
import { useUpdateCartMutation } from './redux/cartApi';
import { CartItem } from './redux/types';

/**
 *
 *
 * @param {Product} product
 * @param {CartItem[]} cartItems
 * @returns {CartItem | null}
 */
export const createCartItem = (product: Product, cartItems: CartItem[]): CartItem | null => {
  if (!product) return null;

  const existingCartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

  if (currentQuantity >= product.stock) return null;

  const newCartItem: CartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: currentQuantity + 1,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    stock: product.stock,
  };

  return newCartItem;
};

export const handleAddToCart = async (cartItem: CartItem, userId: number | undefined) => {
  const [updateCart] = useUpdateCartMutation();

  if (updateCart && userId) {
    try {
      await updateCart({ userId, products: [cartItem] });
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  } else {
    console.error('User ID or updateCart function is not available');
  }
};
