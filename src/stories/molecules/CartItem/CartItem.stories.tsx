import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withReduxProvider } from '../../../../.storybook/decorators';
import { CartList, CartItemProp } from '../../../components/CartItem/CartItem';
import image from '../Card/image.svg';
import './style.scss';

export default {
  component: CartList,
  decorators: [
    withReduxProvider,
    (StoryComponent) => (
      <Router>
        <StoryComponent />
      </Router>
    ),
  ],
} as Meta;

const mockItem: CartItemProp = {
  item: {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    thumbnail: image,
    price: 100,
    quantity: 1,
    discountPercentage: 10,
  },
};

const Template: StoryFn<CartItemProp> = (args) => <CartList {...args} />;

export const Default = Template.bind({});
Default.args = mockItem;
