import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { moviesList } = props;
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesList.map((card, index) => {
          if (index <= 6) {
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
          } else {
            return;
          }
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
