import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProp } from './index';
import './Button.module.scss';

export default {
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProp> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClickAdd: () => alert('Button clicked!'),
};
