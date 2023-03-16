import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import countDuration from '../../utils/utils';
import { imagesUrl } from '../../utils/constants';
import { useState } from 'react';

function MoviesCard(props) {
  const pathname = useLocation().pathname;
  const isOnSearchPage = pathname === '/movies';
  const isOnSavedPage = pathname === '/saved-movies';

  const [isLiked, setIsLiked] = useState(false);

  function handleLikeButton() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__container">
        <div className="movies-card-list__info">
          <div className="movies-card-list__text-container">
            <p className="movies-card-list__title">{props.title}</p>
            <p className="movies-card-list__duration">
              {countDuration(props.duration)}
            </p>
          </div>
          {isOnSavedPage ? (
            <button className="movies-card-list__icon movies-card-list__icon_type_saved"></button>
          ) : isOnSearchPage ? (
            <button
              onClick={handleLikeButton}
              className={
                isLiked
                  ? 'movies-card-list__icon movies-card-list__icon_type_liked'
                  : 'movies-card-list__icon movies-card-list__icon_type_unliked'
              }
            ></button>
          ) : null}
        </div>
        <img
          className="movies-card-list__image"
          alt={props.title}
          src={`${imagesUrl}${props.imgLink}`}
        ></img>
      </div>
    </li>
  );
}

export default MoviesCard;
