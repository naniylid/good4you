import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { Header } from './index';

// Тестируем Header компонент
describe('Header Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // Проверяем, что заголовок отображается
    expect(screen.getByText(/Goods4you/i)).toBeInTheDocument();

    // Проверяем, что основной заголовок и текст отображаются
    expect(screen.getByText(/Any products from famous brands/i)).toBeInTheDocument();
    expect(screen.getByText(/We sell smartphones, laptops, clothes, shoes/i)).toBeInTheDocument();

    // Проверяем, что кнопка "Go to shopping" отображается и имеет правильный текст
    expect(screen.getByRole('button', { name: /Go to shopping/i })).toBeInTheDocument();
  });

  it('has a link to the catalog section', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    // Проверяем, что ссылка ведет к нужному маршруту
    const linkElement = screen.getByRole('link', { name: /Go to shopping/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/#catalog');
  });
});
