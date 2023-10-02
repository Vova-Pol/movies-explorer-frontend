import React, { FC } from 'react';
import './Latest.css';
import PreviewList from '../PreviewList/PreviewList';

const Latest: FC = ({ moviesList }) => {
  return (
    <section className="latest">
      <h2 className="latest__title">Новинки</h2>
      <PreviewList moviesList={moviesList} />
    </section>
  );
};

export default Latest;
