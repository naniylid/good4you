import { render } from '../../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { Product } from '../../../redux/services/products/types';

describe('Card Component', () => {
    const mockProduct: Product = {
        id: 1,
        title: 'Sample Product',
        price: 100,
        discountPercentage: 10,
        stock: 5,
        images: ['image1.jpg'],
        thumbnail: 'thumb1.jpg',
        description: 'Sample Description',
        rating: 4.5,
        warrantyInformation: '1 year',
        shippingInformation: 'Free shipping',
        tags: ['tag1', 'tag2'],
        category: 'simple',
    };

    test('renders product information correctly', () => {
        render(
            <MemoryRouter>
                <Card product={mockProduct} />
            </MemoryRouter>,
        );
    });
});
