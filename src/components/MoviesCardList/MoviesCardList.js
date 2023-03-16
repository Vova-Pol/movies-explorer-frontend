import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesApiURL from '../../utils/MoviesApi';

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      {props.nothingFound ? (
        <span className="movies-card-list__not-found-text">
          Ничего не найдено
        </span>
      ) : null}
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
    </section>
  );
}

export default MoviesCardList;
