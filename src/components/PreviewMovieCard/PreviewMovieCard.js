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
    </div>
  );
};
