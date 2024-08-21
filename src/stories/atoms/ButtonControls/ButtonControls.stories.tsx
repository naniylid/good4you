import { Meta, StoryFn } from '@storybook/react';
import { ButtonControls, ButtonControlsProps } from '../../../components/ButtonControls/index';
import { ProductCart } from '../../../redux/services/cartById/types';
import { withReduxProvider } from '../../../../.storybook/decorators';
import './style.scss';

export default {
  component: ButtonControls,
  decorators: [withReduxProvider],
} as Meta;

const mockProduct: ProductCart = {
  id: 1,
  title: 'Sample Product',
  price: 100,
  quantity: 1,
  total: 1,
  discountPercentage: 10,
  discountedTotal: 90,
  thumbnail: 'img',
};
const Template: StoryFn<ButtonControlsProps> = (args) => <ButtonControls {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: mockProduct,
  quantity: 1,
  stock: 5,
};

export const OutOfStock = Template.bind({});
OutOfStock.args = {
  product: mockProduct,
  quantity: 5, // At stock limit
  stock: 5,
};
