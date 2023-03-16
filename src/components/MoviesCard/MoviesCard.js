import './MoviesCard.css';
import countDuration from '../../utils/utils';
import { imagesUrl } from '../../utils/constants';

function MoviesCard(props) {
  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__container">
        <div className="movies-card-list__info">
          <div className="movies-card-list__text-container">
            <p className="movies-card-list__title">{props.title}</p>
            <p className="movies-card-list__duration">
              {countDuration(props.duration)}
            </p>
          </div>
          <button
            className={
              props.isSaved
                ? 'movies-card-list__icon movies-card-list__icon_type_saved'
                : props.isLiked
                ? 'movies-card-list__icon movies-card-list__icon_type_liked'
                : 'movies-card-list__icon movies-card-list__icon_type_unliked'
            }
          ></button>
        </div>
        <img
          className="movies-card-list__image"
          alt={props.title}
          src={`${imagesUrl}${props.imgLink}`}
        ></img>
      </div>
    </li>
  );
}

export default MoviesCard;
