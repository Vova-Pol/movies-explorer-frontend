import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import countDuration from '../../utils/utils';
import {
  IMAGES_URL,
  MOVIES_PAGE_URL,
  SAVED_MOVIES_PAGE_URL,
  SERVER_ERROR_TEXT,
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';

function MoviesCard(props) {
  const [isServerError, setIsServerError] = useState(false);

  const isOnSearchPage = useLocation().pathname === MOVIES_PAGE_URL;
  const isOnSavedPage = useLocation().pathname === SAVED_MOVIES_PAGE_URL;

  // Имеются как общие, так и различные пропсы для
  // карточек пришедших с разных api (moviesApi и mainApi)

  const {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
  } = props.cardData; // Общие пропсы

  const { id, image } = props.cardData; // Поиск
  const { _id, thumbnail } = props.cardData; // Сохраненные

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (props.isLiked) {
      setIsLiked(true);
    }
  }, []);

  function handleLikeButton() {
    const savedMovieData = {
      country,
      director,
      duration,
      year,
      description,
      image: `${IMAGES_URL}${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `${IMAGES_URL}${image.formats.thumbnail.url}`,
      movieId: id,
    };
    if (!isLiked) {
      mainApi
        .saveMovie(savedMovieData)
        .then((res) => {
          if (res) {
            setIsLiked(true);
            localStorage.removeItem('saved-movies-list');
          }
        })
        .catch((err) => {
          setIsServerError(true);
          console.error(err);
        });
    } else {
      mainApi
        .deleteMovie(props.savedId)
        .then((res) => {
          if (res) {
            setIsLiked(false);
            localStorage.removeItem('saved-movies-list');
          }
        })
        .catch((err) => {
          setIsServerError(true);
          console.error(err);
        });
    }
  }

  function handleCrossButton() {
    mainApi
      .deleteMovie(_id)
      .then((res) => {
        if (res) {
          setIsLiked(false);
          props.handleDeleteMovie(res.data._id);
        }
      })
      .catch((err) => {
        setIsServerError(true);
        console.error(err);
      });
  }

  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__container">
        <div className="movies-card-list__info">
          <div className="movies-card-list__text-container">
            <p className="movies-card-list__title">{nameRU}</p>
            <p className="movies-card-list__duration">
              {countDuration(duration)}
            </p>
          </div>
          <span className="movies-card-list__error-text">
            {isServerError ? SERVER_ERROR_TEXT : ''}
          </span>
          {isOnSavedPage ? (
            <button
              onClick={handleCrossButton}
              className="movies-card-list__icon movies-card-list__icon_type_cross"
            ></button>
          ) : isOnSearchPage ? (
            <button
              onClick={handleLikeButton}
              className={
                isLiked
                  ? 'movies-card-list__icon movies-card-list__icon_type_liked'
                  : 'movies-card-list__icon movies-card-list__icon_type_disliked'
              }
            ></button>
          ) : null}
        </div>
        <Link
          to={trailerLink}
          target="_blank"
          className="movies-card-list__image-container"
        >
          <img
            className="movies-card-list__image"
            alt={nameRU}
            src={
              isOnSearchPage
                ? `${IMAGES_URL}${image.formats.thumbnail.url}`
                : thumbnail
            }
          ></img>
        </Link>
      </div>
    </li>
  );
}

export default MoviesCard;
