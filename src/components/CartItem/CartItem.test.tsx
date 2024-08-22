import { render } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { CartItem } from './CartItem';
import { ProductCart } from '../../redux/services/cartById/types';

describe('CartItem Component', () => {
  const mockProduct: ProductCart = {
    id: 1,
    title: 'Sample Product',
    price: 100,
    thumbnail: 'thumbnail.jpg',
    quantity: 1,
    total: 3,
    discountPercentage: 10,
    discountedTotal: 90,
  };

  test('renders product information correctly', () => {
    render(
      <MemoryRouter>
        <CartItem product={mockProduct} />
      </MemoryRouter>,
    );
  });
});
