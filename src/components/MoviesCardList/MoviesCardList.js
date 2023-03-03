import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {props.moviesList.map((card) => {
          return (
            <MoviesCard
              key={card._id}
              title={card.title}
              duration={card.duration}
              imgLink={card.imgLink}
              isLiked={card.isLiked}
              isSaved={props.isSaved}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
