import React, { FC } from 'react';
import './BestBritish.css';
import PreviewList from '../PreviewList/PreviewList';
import { IMovie } from '../../types/movie';

interface IBestBritishProps {
  moviesList: IMovie[];
}

const BestBritish: FC<IBestBritishProps> = ({ moviesList }) => {
  return (
    <section className="best-british">
      <h2 className="best-british__title">Лучшее из Великобритании</h2>
      <PreviewList moviesList={moviesList.slice(0, 8)} />
    </section>
  );
};

export default BestBritish;
