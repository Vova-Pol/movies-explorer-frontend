import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__container">
        <div className="movies-card-list__info">
          <p className="movies-card-list__title">{props.title}</p>
          <p className="movies-card-list__duration">{props.duration}</p>
          <span
            className={
              props.isLiked
                ? 'movies-card-list__like_type_liked'
                : 'movies-card-list__like'
            }
          ></span>
        </div>
        <img
          className="movies-card-list__image"
          alt={props.title}
          src={props.imgLink}
        ></img>
      </div>
    </li>
  );
}

export default MoviesCard;
