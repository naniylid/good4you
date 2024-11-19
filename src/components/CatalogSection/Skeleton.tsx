import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={370}
    height={366}
    viewBox='0 0 370 366'
    backgroundColor='#eae9e9'
    foregroundColor='#ecebeb'
  >
    <rect x='118' y='654' rx='27' ry='27' width='152' height='40' />
    <rect x='14' y='654' rx='27' ry='27' width='88' height='40' />
    <rect x='0' y='0' rx='4' ry='4' width='370' height='300' />
    <rect x='0' y='311' rx='0' ry='0' width='310' height='50' />
    <rect x='318' y='311' rx='4' ry='4' width='50' height='50' />
  </ContentLoader>
);
