import React from 'react';

import './Home.module.scss';
import { Header } from '../../components/Header';
import { Catalog } from '../../components/Catalog';
import { FAQ } from '../../components/FAQ';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Catalog />
      <FAQ />
    </>
  );
};
