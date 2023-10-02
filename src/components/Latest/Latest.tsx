import React, { FC } from 'react';
import './Latest.css';
import PreviewList from '../PreviewList/PreviewList';
import { IMovie } from '../../types/movie';

interface ILatestProps {
  moviesList: IMovie[];
}

const Latest: FC<ILatestProps> = ({ moviesList }) => {
  return (
    <section className="latest">
      <h2 className="latest__title">Новинки</h2>
      <PreviewList moviesList={moviesList} />
    </section>
  );
};

export default Latest;
