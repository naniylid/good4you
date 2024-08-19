import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './index';

describe('Button component', () => {
  it('renders correctly', () => {
    const mockOnClickAdd = vi.fn();

    render(<Button onClickAdd={mockOnClickAdd} />);

    // Проверка, что кнопка рендерится
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClickAdd when clicked', async () => {
    const mockOnClickAdd = vi.fn();

    render(<Button onClickAdd={mockOnClickAdd} />);

    // Проверка, что onClickAdd вызывается при клике
    const button = screen.getByRole('button', { name: /add to cart/i });
    await userEvent.click(button);
    expect(mockOnClickAdd).toHaveBeenCalledTimes(1);
  });
});
