import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { nothingFoundText, serverErrorText } from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';

function MoviesCardList(props) {
  const [resultText, setResultText] = useState('');
  const isOnSearchPage = useLocation().pathname === '/movies';
  const isOnSavedPage = useLocation().pathname === '/saved-movies';

  useEffect(() => {
    if (props.nothingFound) {
      setResultText(nothingFoundText);
    }
    if (props.serverError) {
      setResultText(serverErrorText);
    }
  }, []);

  function handleDeleteMovie(_id) {
    props.onDeleteMovie(_id);
  }
  console.log(props.savedMoviesList);

  return (
    <section className="movies-card-list">
      {resultText !== '' ? (
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
