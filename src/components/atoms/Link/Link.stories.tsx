import { Meta, StoryFn } from '@storybook/react';

import { LinkTitle, LinkTitleProp } from './Link';
import './Link.module.scss';

export default {
  component: LinkTitle,
} as Meta<typeof LinkTitle>;

const Template: StoryFn<LinkTitleProp> = (args) => <LinkTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Essence Mascara Lash Princess',
};
