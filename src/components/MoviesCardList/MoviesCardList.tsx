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
import { IMovie } from '../../types/movie';

interface IMoviesCardListProps {
  isNothingFound: boolean;
  isServerError: boolean;
  onDeleteMovie: (_id: number) => void;
  moviesList: IMovie[];
  moviesAmount: number;
}

const MoviesCardList: FC<IMoviesCardListProps> = ({
  isNothingFound,
  isServerError,
  onDeleteMovie,
  moviesList,
  moviesAmount,
}) => {
  const [resultText, setResultText] = useState('');
  const isOnSearchPage = useLocation().pathname === MOVIES_PAGE_URL;

  useEffect(() => {
    if (isNothingFound) {
      setResultText(NOTHING_FOUND_ERROR_TEXT);
    }
    if (isServerError) {
      setResultText(SERVER_ERROR_TEXT);
    }
  }, [isNothingFound, isServerError]);

  function handleDeleteMovie(_id: number) {
    onDeleteMovie(_id);
  }

  return (
    <section className="movies-card-list">
      {isNothingFound || isServerError ? (
        <span className="movies-card-list__result-text">{resultText}</span>
      ) : (
        <ul className="movies-card-list__list">
          {moviesList.map((card, index) => {
            if (index <= moviesAmount - 1) {
              let isLiked;
              let savedId;
              if (isOnSearchPage) {
                for (let savedMovie of props.savedMoviesList) {
                  if (savedMovie.movieId === card.id) {
                    isLiked = true;
                    savedId = savedMovie._id;
                    break;
                  } else {
                    isLiked = false;
                    savedId = null;
                  }
                }
              }
              return (
                <MoviesCard
                  key={isOnSearchPage ? card.id : card._id}
                  cardData={card}
                  handleDeleteMovie={handleDeleteMovie}
                  isLiked={isLiked}
                  savedId={savedId}
                />
              );
            } else {
              return;
            }
          })}
        </ul>
      )}
    </section>
  );
};

export default MoviesCardList;
