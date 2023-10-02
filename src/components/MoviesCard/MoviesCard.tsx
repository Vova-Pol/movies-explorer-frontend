import React from 'react';
import './MoviesCard.css';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import countDuration from '../../utils/utils';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import {
  IMAGES_URL,
  MOVIES_PAGE_URL,
  SAVED_MOVIES_PAGE_URL,
  SERVER_ERROR_TEXT,
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';

interface IMoviesCardProps {
  handleDeleteMovie: (_id: number) => void;
  isLiked: boolean;
}

const MoviesCard: FC<IMoviesCardProps> = ({ handleDeleteMovie, isLiked }) => {
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

  const [isCardLiked, setIsCardLiked] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setIsCardLiked(true);
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
    if (!isCardLiked) {
      mainApi
        .saveMovie(savedMovieData)
        .then((res) => {
          if (res) {
            setIsCardLiked(true);
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
            setIsCardLiked(false);
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
          setIsCardLiked(false);
          handleDeleteMovie(res.data._id);
          localStorage.removeItem('saved-movies-list');
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
          {isOnSavedPage && (
            <button
              onClick={handleCrossButton}
              className="movies-card-list__icon"
            >
              <RxCross2 />
            </button>
          )}
          {isOnSearchPage && (
            <button
              onClick={handleLikeButton}
              className="movies-card-list__icon"
            >
              {isCardLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MoviesCard;
