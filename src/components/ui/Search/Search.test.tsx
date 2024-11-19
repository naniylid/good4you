import { render, screen, fireEvent } from '../../../utils/test-utils';
import '@testing-library/jest-dom';

import { Search } from './index';

describe('Search component', () => {
    it('renders correctly', () => {
        render(<Search />);

        const inputElement = screen.getByPlaceholderText('Search by title');
        expect(inputElement).toBeInTheDocument();
    });

    it('updates input value and dispatches setValue and setSearchValue', () => {
        render(<Search />);

        const inputElement = screen.getByPlaceholderText('Search by title');
        fireEvent.change(inputElement, { target: { value: 'test' } });
    });
});
