import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { nothingFoundText, serverErrorText } from '../../utils/constants';

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

  return (
    <section className="movies-card-list">
      {resultText !== '' ? (
        <span className="movies-card-list__result-text">{resultText}</span>
      ) : (
        <ul className="movies-card-list__list">
          {props.moviesList.map((card, index) => {
            if (index <= props.moviesAmount - 1) {
              return (
                <MoviesCard
                  key={isOnSearchPage ? card.id : card._id}
                  cardData={card}
                  handleDeleteMovie={handleDeleteMovie}
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
