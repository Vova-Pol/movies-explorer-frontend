import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { nothingFoundText, serverErrorText } from '../../utils/constants';

function MoviesCardList(props) {
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (props.nothingFound) {
      setResultText(nothingFoundText);
    }
    if (props.serverError) {
      setResultText(serverErrorText);
    }
  }, []);

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
                  key={card.id}
                  title={card.nameRU}
                  duration={card.duration}
                  imgLink={card.image.formats.thumbnail.url}
                  isLiked={false}
                  isSaved={props.isSaved}
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
