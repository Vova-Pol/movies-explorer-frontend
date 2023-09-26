import React from 'react';
import './PreviewList.css';
import { PreviewMovieCard } from '../PreviewMovieCard/PreviewMovieCard';

export const PreviewList = ({ moviesList }) => {
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
