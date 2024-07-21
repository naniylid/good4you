import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { LinkTitle } from './Link';

describe('LinkTitle component', () => {
  it('renders correctly with given text', () => {
    const text = 'Essence Mascara Lash Princess';

    render(<LinkTitle text={text} />);

    // Проверка, что текст корректно рендерится
    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('link cart-active');
  });

  it('renders with the correct class names', () => {
    const text = 'Essence Mascara Lash Princess';

    render(<LinkTitle text={text} />);

    // Проверка наличия классов
    const linkElement = screen.getByText(text);
    expect(linkElement).toHaveClass('link cart-active');
  });
});
