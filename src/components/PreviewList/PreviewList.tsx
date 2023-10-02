import React, { FC } from 'react';
import './PreviewList.css';
import PreviewMovieCard from '../PreviewMovieCard/PreviewMovieCard';
import { IMovie } from '../../types/movie';

interface IPreviewListProps {
  moviesList: IMovie[];
}

const PreviewList: FC<IPreviewListProps> = ({ moviesList }) => {
  return (
    <ul className="preview-list">
      {moviesList.map((card) => {
        return (
          <li key={card.id}>
            <PreviewMovieCard card={card} />
          </li>
        );
      })}
    </ul>
  );
};

export default PreviewList;
