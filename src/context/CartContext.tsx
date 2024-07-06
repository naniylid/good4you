import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartItems: { [key: number]: number };
  addToCart: (id: number) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Ошибка контекста');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  const totalCount = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  const addToCart = (id: number) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [id]: (prevCartItems[id] || 0) + 1,
    }));
  };

  const increaseItem = (id: number) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [id]: (prevCartItems[id] || 0) + 1,
    }));
  };

  const decreaseItem = (id: number) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[id] > 1) {
        newCartItems[id] -= 1;
      } else {
        delete newCartItems[id];
      }
      return newCartItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseItem, decreaseItem, totalCount }}>
      {children}
    </CartContext.Provider>
  );
};
