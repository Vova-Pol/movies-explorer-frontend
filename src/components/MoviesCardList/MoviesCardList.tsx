import React, { FC } from 'react';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  NOTHING_FOUND_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  MOVIES_PAGE_URL,
} from '../../utils/constants';
import { IMovie, ISavedMovie } from '../../types/movie';

interface IMoviesCardListProps {
  isNothingFound: boolean;
  isServerError: boolean;
  moviesList?: IMovie[];
  moviesAmount: number;
  savedMoviesList: ISavedMovie[];
  onDeleteMovie: (id: number) => void;
}

const MoviesCardList: FC<IMoviesCardListProps> = ({
  isNothingFound,
  isServerError,
  onDeleteMovie,
  moviesList,
  moviesAmount,
  savedMoviesList,
}) => {
  const [resultText, setResultText] = useState('');
  const isOnMoviesPage = useLocation().pathname === MOVIES_PAGE_URL;

  useEffect(() => {
    if (isNothingFound) {
      setResultText(NOTHING_FOUND_ERROR_TEXT);
    }
    if (isServerError) {
      setResultText(SERVER_ERROR_TEXT);
    }
  }, [isNothingFound, isServerError]);

  function handleDeleteMovie(id: number) {
    onDeleteMovie(id);
  }

  return (
    <section className="movies-card-list">
      {isNothingFound || isServerError ? (
        <span className="movies-card-list__result-text">{resultText}</span>
      ) : (
        <ul className="movies-card-list__list">
          {moviesList &&
            moviesList.map((card, index) => {
              if (index <= moviesAmount - 1) {
                let isLiked = false;
                if (isOnMoviesPage) {
                  for (let savedMovie of savedMoviesList) {
                    if (savedMovie.id === card.id) {
                      isLiked = true;
                      break;
                    }
                  }
                }
                return (
                  <MoviesCard
                    key={card.id}
                    cardData={card}
                    handleDeleteMovie={handleDeleteMovie}
                    isLiked={isLiked}
                  />
                );
              }
              return;
            })}
        </ul>
      )}
    </section>
  );
};

export default MoviesCardList;
