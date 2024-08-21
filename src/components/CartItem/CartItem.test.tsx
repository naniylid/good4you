import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from './CartItem';
import { BrowserRouter } from 'react-router-dom';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  thumbnail: 'test-thumbnail.jpg',
  price: 99.99,
  quantity: 2,
  discountPercentage: 10,
};

const mockProducts = [mockProduct];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: mockProducts,
  },
  reducers: {},
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    items: mockProducts,
  },
  reducers: {},
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
});

describe('CartItem', () => {
  test('renders CartItem component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItem item={mockProduct} userId={123} />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$ 99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-thumbnail.jpg');
  });

  test('handles click on add button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItem item={mockProduct} userId={123} />
        </Provider>
      </BrowserRouter>,
    );

    const addButton = screen.getByRole('button', { name: /Decrease/i });
    fireEvent.click(addButton);
  });

  test('handles click on minus button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItem item={mockProduct} userId={123} />
        </Provider>
      </BrowserRouter>,
    );

    const minusButton = screen.getByRole('button', { name: /Increase/i });
    fireEvent.click(minusButton);
  });

  test('handles click on remove button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItem item={mockProduct} userId={123} />
        </Provider>
      </BrowserRouter>,
    );

    const removeButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(removeButton);
  });
});
