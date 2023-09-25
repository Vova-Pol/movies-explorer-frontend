import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  NOTHING_FOUND_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  MOVIES_PAGE_URL,
} from '../../utils/constants';

function MoviesCardList(props) {
  const [resultText, setResultText] = useState('');
  const isOnSearchPage = useLocation().pathname === MOVIES_PAGE_URL;

  useEffect(() => {
    if (props.nothingFound) {
      setResultText(NOTHING_FOUND_ERROR_TEXT);
    }
    if (props.serverError) {
      setResultText(SERVER_ERROR_TEXT);
    }
  }, [props]);

  function handleDeleteMovie(_id) {
    props.onDeleteMovie(_id);
  }

  return (
    <section className="movies-card-list">
      {props.nothingFound || props.serverError ? (
        <span className="movies-card-list__result-text">{resultText}</span>
      ) : (
        <ul className="movies-card-list__list">
          {props.moviesList.map((card, index) => {
            if (index <= props.moviesAmount - 1) {
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
}

export default MoviesCardList;
