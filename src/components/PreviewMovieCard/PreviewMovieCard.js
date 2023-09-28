import React, { useState } from 'react';
import './PreviewMovieCard.css';
import { IMAGES_URL } from '../../utils/constants';

export const PreviewMovieCard = ({ card }) => {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeButton() {
    console.log('Like Button was pressed');
  }
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
      <button
        onClick={handleLikeButton}
        className={
          isLiked
            ? 'preview-movie-card__icon preview-movie-card__icon_type_liked'
            : 'preview-movie-card__icon preview-movie-card__icon_type_disliked'
        }
      ></button>
    </div>
  );
};
