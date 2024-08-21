import { Meta, StoryFn } from '@storybook/react';
import { Card, CardProp } from '../../../components/Card/Card';
import { BrowserRouter as Router } from 'react-router-dom';
import { withReduxProvider } from '../../../../.storybook/decorators';
import image from './image.svg';
import './Card.scss';
import { Product } from '../../../redux/services/products/types';

export default {
  component: Card,
  decorators: [
    withReduxProvider,
    (StoryComponent) => (
      <Router>
        <StoryComponent />
      </Router>
    ),
  ],
} as Meta;

const mockProduct: Product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  images: [image],
  price: 100,
  discountPercentage: 10,
  stock: 10,
  tags: ['tag'],
  thumbnail: image,
  description: '',
  category: 'beauty',
  rating: 4.5,
};

const Template: StoryFn<CardProp> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: mockProduct,
};
