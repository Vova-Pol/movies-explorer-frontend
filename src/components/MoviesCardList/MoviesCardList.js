import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const [resultText, setResultText] = useState('');
  const nothingFoundText = 'Ничего не найдено';
  const serverErrorText =
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

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
            if (index <= 6) {
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
