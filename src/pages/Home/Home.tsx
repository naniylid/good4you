import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Catalog } from '../../components/Catalog';
import { FAQ } from '../../components/FAQ';

export const Home: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
