import React, { FC } from 'react';
import './BestAmerican.css';
import PreviewList from '../PreviewList/PreviewList';

const BestAmerican: FC = ({ moviesList }) => {
  return (
    <section className="best-american">
      <h2 className="best-american__title">Лучшее из США</h2>
      <PreviewList moviesList={moviesList.slice(0, 6)} />
    </section>
  );
};

export default BestAmerican;
