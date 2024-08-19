import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProp } from '../../../components/Button/index';
import '../../../components/Button/Button.module.scss';

export default {
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProp> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('Button clicked!'),
};
