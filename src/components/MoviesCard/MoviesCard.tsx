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
  SAVED_MOVIES_LIST_LS_KEY,
  SAVED_MOVIES_PAGE_URL,
  SERVER_ERROR_TEXT,
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { IMovie, ISavedMovie } from '../../types/movie';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IMoviesCardProps {
  handleDeleteMovie: (id: number) => void;
  isLiked: boolean;
  cardData: ISavedMovie | IMovie;
}

const MoviesCard: FC<IMoviesCardProps> = ({
  handleDeleteMovie,
  isLiked,
  cardData,
}) => {
  const [isServerError, setIsServerError] = useState(false);
  const { removeFromLs } = useLocalStorage();

  const isOnSearchPage = useLocation().pathname === MOVIES_PAGE_URL;
  const isOnSavedPage = useLocation().pathname === SAVED_MOVIES_PAGE_URL;

  // Имеются как общие, так и различные пропсы для
  // карточек пришедших с разных api (moviesApi и mainApi)

  const {
    id,
    country,
    director,
    duration,
    year,
    image,
    description,
    trailerLink,
    nameRU,
    nameEN,
  } = cardData;

  const [isCardLiked, setIsCardLiked] = useState(false);

  useEffect(() => {
    if (isLiked) setIsCardLiked(true);
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
            removeFromLs(SAVED_MOVIES_LIST_LS_KEY);
          }
        })
        .catch((err) => {
          setIsServerError(true);
          console.error(err);
        });
    } else {
      mainApi
        .deleteMovie(id)
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
      .deleteMovie(id)
      .then((res) => {
        if (res) {
          setIsCardLiked(false);
          handleDeleteMovie(res.data._id);
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
