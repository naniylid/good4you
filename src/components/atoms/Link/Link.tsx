import React from 'react';
import './Link.scss';

export type LinkTitleProp = {
  text: string;
};

export const LinkTitle: React.FC<LinkTitleProp> = ({ text }) => {
  return <h4 className='link cart-active'>{text}</h4>;
};
