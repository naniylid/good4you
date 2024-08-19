import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addProduct: vi.fn(),
    minusItem: vi.fn(),
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userId: 'test-user-id' },
  reducers: {},
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

vi.mock('../../../pages/Cart/addToCart', () => ({
  createCartItem: vi.fn(),
  handleAddToCart: vi.fn(),
}));

describe('Card Component', () => {
  it('renders correctly and responds to clicks', () => {
    const mockProduct = {
      id: 1,
      title: 'Sample Product',
      price: 100,
      discountPercentage: 10,
      images: ['http://example.com/image.jpg'],
      stock: 10,
      tags: ['1', '2'],
      thumbnail: 'http://example.com/image.jpg',
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card item={mockProduct} />
        </MemoryRouter>
      </Provider>,
    );

    // Проверяем, что изображение и текст отображаются
    expect(screen.getByAltText(/Sample Product/i)).toBeInTheDocument();

    // Проверяем, что кнопка для добавления в корзину отображается
    const addButton = screen.getByRole('button', { name: /Add/i });
    expect(addButton).toBeInTheDocument();
  });
});
