import React from 'react';
import './MoviesCard.css';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { countDuration } from '../../utils/utils';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import {
  IMAGES_URL,
  MOVIES_PAGE_URL,
  SAVED_MOVIES_LIST_LS_KEY,
  SAVED_MOVIES_PAGE_URL,
  SERVER_ERROR_TEXT,
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { IMovie } from '../../types/movie';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IMoviesCardProps {
  handleDeleteMovie?: (id: number) => void;
  isLiked: boolean;
  cardData: IMovie;
}

const MoviesCard: FC<IMoviesCardProps> = ({
  handleDeleteMovie,
  isLiked,
  cardData,
}) => {
  const [isServerError, setIsServerError] = useState(false);
  const [isCardLiked, setIsCardLiked] = useState(isLiked);
  const { removeFromLs } = useLocalStorage();

  const isOnMoviesPage = useLocation().pathname === MOVIES_PAGE_URL;
  const isOnSavedMoviesPage = useLocation().pathname === SAVED_MOVIES_PAGE_URL;

  function handleLikeButton() {
    if (!isCardLiked) {
      const savedMovieData = {
        ...cardData,
        image: cardData.image.formats.thumbnail.url,
      };
      console.log(savedMovieData);
      mainApi
        .saveMovie(savedMovieData)
        .then(() => {
          setIsCardLiked(true);
          removeFromLs(SAVED_MOVIES_LIST_LS_KEY);
        })
        .catch((err) => {
          setIsServerError(true);
          console.error(err);
          console.log(err.response.data.message);
        });
    } else {
      mainApi
        .deleteMovie(cardData.id)
        .then((res) => {
          if (res) {
            setIsCardLiked(false);
            removeFromLs(SAVED_MOVIES_LIST_LS_KEY);
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
      .deleteMovie(cardData.id)
      .then((res) => {
        if (res) {
          setIsCardLiked(false);
          handleDeleteMovie!(res.data.id);
          removeFromLs(SAVED_MOVIES_LIST_LS_KEY);
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
          to={cardData.trailerLink}
          target="_blank"
          className="movies-card-list__image-container"
        >
          <img
            className="movies-card-list__image"
            alt={cardData.nameRU}
            src={`${IMAGES_URL}${
              isOnMoviesPage
                ? cardData.image.formats.thumbnail.url
                : cardData.image
            }`}
          ></img>
        </Link>
        <div className="movies-card-list__info">
          <div className="movies-card-list__text-container">
            <p className="movies-card-list__title">{cardData.nameRU}</p>
            <p className="movies-card-list__duration">
              {countDuration(cardData.duration)}
            </p>
          </div>
          <span className="movies-card-list__error-text">
            {isServerError ? SERVER_ERROR_TEXT : ''}
          </span>
          {isOnSavedMoviesPage && (
            <button
              onClick={handleCrossButton}
              className="movies-card-list__icon"
            >
              <RxCross2 />
            </button>
          )}
          {isOnMoviesPage && (
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
