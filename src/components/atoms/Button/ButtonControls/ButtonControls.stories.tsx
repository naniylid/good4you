import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ButtonControls, ButtonControlsProps } from './index';
import './style.scss';

export default {
  component: ButtonControls,
} as Meta;

const Template: StoryFn<ButtonControlsProps> = (args) => {
  const [itemCount, setItemCount] = useState(args.itemCount);

  const handleAdd = () => {
    if (itemCount < args.stock) {
      setItemCount(itemCount + 1);
    }
  };

  const handleMinus = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <ButtonControls
      {...args}
      itemCount={itemCount}
      onClickAdd={handleAdd}
      onClickMinus={handleMinus}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  itemCount: 1,
  stock: 5,
};
