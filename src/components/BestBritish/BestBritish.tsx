import React, { FC } from 'react';
import './BestBritish.css';
import PreviewList from '../PreviewList/PreviewList';

const BestBritish: FC = ({ moviesList }) => {
  return (
    <section className="best-british">
      <h2 className="best-british__title">Лучшее из Великобритании</h2>
      <PreviewList moviesList={moviesList.slice(0, 8)} />
    </section>
  );
};

export default BestBritish;
