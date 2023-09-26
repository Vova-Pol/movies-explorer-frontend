import React from 'react';
import './PreviewMovieCard.css';
import { IMAGES_URL } from '../../utils/constants';

export const PreviewMovieCard = ({ card }) => {
  console.log(card);
  return (
    <div className="preview-movie-card">
      <img
        className="preview-movie-card__thumbnail"
        src={`${IMAGES_URL}${card.image.formats.thumbnail.url}`}
      />
      <div className="preview-movie-card__info">
        <p className="preview-movie-card__title">{card.nameRU}</p>
        <p className="preview-movie-card__year">{card.year}</p>
      </div>
    </div>
  );
};
