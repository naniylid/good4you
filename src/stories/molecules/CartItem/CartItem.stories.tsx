import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withReduxProvider } from '../../../../.storybook/decorators';
import { CartItem, CartItemProp } from '../../../components/CartItem/CartItem';
import { ProductCart } from '../../../redux/services/cartById/types';
import image from '../Card/image.svg';
import './CartItem.scss';

export default {
  component: CartItem,
  decorators: [
    withReduxProvider,
    (StoryComponent) => (
      <Router>
        <StoryComponent />
      </Router>
    ),
  ],
} as Meta;

const mockProduct: ProductCart = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  price: 100,
  quantity: 2,
  thumbnail: image,
  total: 5,
  discountPercentage: 10,
  discountedTotal: 90,
};

const Template: StoryFn<CartItemProp> = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: mockProduct,
};
