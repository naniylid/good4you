export type CartItem = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  count: number;
  stock?: number;
};

export interface CartSliceState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  removedItems: CartItem[];
  discountedTotal: number;
}
