import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Header } from '../../components/Header';
import { Catalog } from '../../components/Catalog';
import { FAQ } from '../../components/FAQ';

export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Catalog | Goods4you</title>
      </Helmet>
      <Header />
      <Catalog />
      <FAQ />
    </>
  );
};
