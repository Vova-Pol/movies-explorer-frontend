import React from 'react';
import './Latest.css';
import { PreviewList } from '../PreviewList/PreviewList';

export const Latest = ({ moviesList }) => {
  return (
    <section className="latest">
      <h2 className="latest__title">Новинки</h2>
      <PreviewList moviesList={moviesList} />
    </section>
  );
};
