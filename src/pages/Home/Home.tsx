import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Catalog } from '../../components/Catalog';
import { FAQ } from '../../components/FAQ';

export const Home: React.FC = () => {
  const location = useLocation();
  const lastHash = React.useRef('');

  React.useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      document
        .getElementById(lastHash.current)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      lastHash.current = '';
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
