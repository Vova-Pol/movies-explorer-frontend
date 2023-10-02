import React, { FC } from 'react';
import './PreviewList.css';
import PreviewMovieCard from '../PreviewMovieCard/PreviewMovieCard';

const PreviewList: FC = ({ moviesList }) => {
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
