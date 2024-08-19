import { render, screen, waitFor } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Login } from './Login';

import { describe, it, expect, vi } from 'vitest';

// Создание мока для навигации
const mockNavigate = vi.fn();

// Создание мока для useLoginMutation
vi.mock('./apiAuth', () => ({
  authApi: {
    useLoginMutation: () => [vi.fn().mockResolvedValue({}), { isLoading: false, error: undefined }],
  },
}));

// Создание мока для useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

describe('Login Component', () => {
  it('renders Login component and handles login', async () => {
    store.dispatch(setUsername('emilys'));
    store.dispatch(setPassword('emilyspass'));
    store.dispatch(setValid(true));

    render(<Login />);

    // Проверка наличия элементов
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Проверка состояния кнопки
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    // Симуляция ввода данных с помощью userEvent
    await userEvent.type(screen.getByLabelText(/Username/i), 'newuser');
    await userEvent.type(screen.getByLabelText(/Password/i), 'newpassword');

    // Симуляция отправки формы
    userEvent.click(submitButton);

    // Убедиться, что текст ошибки не отображается
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('displays error message when login fails', async () => {
    vi.mock('./apiAuth', () => ({
      authApi: {
        useLoginMutation: () => [
          vi.fn().mockRejectedValue({ data: { message: 'Invalid credentials' } }),
          { isLoading: false, error: { data: { message: 'Invalid credentials' } } },
        ],
      },
    }));

    render(<Login />);

    // Симуляция ввода данных с помощью userEvent
    await userEvent.type(screen.getByLabelText(/Username/i), 'newuser');
    await userEvent.type(screen.getByLabelText(/Password/i), 'newpassword');

    // Симуляция отправки формы
    userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Проверка наличия сообщения об ошибке
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials'));
  });
});
