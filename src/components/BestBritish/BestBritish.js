import React from 'react';
import './BestBritish.css';
import { PreviewList } from '../PreviewList/PreviewList';

export const BestBritish = ({ moviesList }) => {
  return (
    <section className="best-british">
      <h2 className="best-british__title">Лучшее из Великобритании</h2>
      <PreviewList moviesList={moviesList.slice(0, 8)} />
    </section>
  );
};
