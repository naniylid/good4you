import { Meta, StoryFn } from '@storybook/react';
import { Search } from './index';
import { withReduxProvider } from '../../../../.storybook/decorators';

export default {
  component: Search,
  decorators: [withReduxProvider],
} as Meta;

const Template: StoryFn = () => {
  return <Search />;
};

export const Default = Template.bind({});
Default.args = {};
