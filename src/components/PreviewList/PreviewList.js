import React from 'react';
import './PreviewList.css';
import { PreviewMovieCard } from '../PreviewMovieCard/PreviewMovieCard';

export const PreviewList = ({ moviesList }) => {
  console.log(moviesList);
  return (
    <ul className="preview-list">
      {moviesList.map((card) => {
        return (
          <li>
            <PreviewMovieCard card={card} />
          </li>
        );
      })}
    </ul>
  );
};
