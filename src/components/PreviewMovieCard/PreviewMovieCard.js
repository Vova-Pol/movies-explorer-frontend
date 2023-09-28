import React, { useState } from 'react';
import './PreviewMovieCard.css';
import { IMAGES_URL } from '../../utils/constants';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

export const PreviewMovieCard = ({ card }) => {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeButton() {
    setIsLiked(!isLiked);
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
      <button onClick={handleLikeButton} className="preview-movie-card__icon">
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
};
