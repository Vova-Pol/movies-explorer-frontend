import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import countDuration from '../../utils/utils';
import { imagesUrl } from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';

function MoviesCard(props) {
  const isOnSearchPage = useLocation().pathname === '/movies';
  const isOnSavedPage = useLocation().pathname === '/saved-movies';

  // Имеются как общие, так и различные пропсы для
  // карточек пришедших с разных api (moviesApi и mainApi)

  const {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
  } = props.cardData; // Общие пропсы

  const { id, image } = props.cardData; // Поиск
  const { _id, thumbnail } = props.cardData; // Сохраненные

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (props.isLiked) {
      setIsLiked(true);
    }
  }, []);

  function handleLikeButton() {
    const savedMovieData = {
      country,
      director,
      duration,
      year,
      description,
      image: `${imagesUrl}${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `${imagesUrl}${image.formats.thumbnail.url}`,
      movieId: id,
    };
    if (!isLiked) {
      mainApi
        .saveMovie(savedMovieData)
        .then((res) => {
          if (res) {
            setIsLiked(true);
            localStorage.removeItem('saved-movies-list');
          }
        })
        .catch((errStatus) => {
          console.error(errStatus);
        });
    } else {
      mainApi
        .deleteMovie(props.savedId)
        .then((res) => {
          if (res) {
            setIsLiked(false);
            localStorage.removeItem('saved-movies-list');
          }
        })
        .catch((errStatus) => {
          console.error(errStatus);
        });
    }
  }

  function handleCrossButton() {
    mainApi
      .deleteMovie(_id)
      .then((res) => {
        if (res) {
          setIsLiked(false);
          props.handleDeleteMovie(res.data._id);
        }
      })
      .catch((errStatus) => {
        console.error(errStatus);
      });
  }
  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__container">
        <div className="movies-card-list__info">
          <div className="movies-card-list__text-container">
            <p className="movies-card-list__title">{nameRU}</p>
            <p className="movies-card-list__duration">
              {countDuration(duration)}
            </p>
          </div>
          {isOnSavedPage ? (
            <button
              onClick={handleCrossButton}
              className="movies-card-list__icon movies-card-list__icon_type_cross"
            ></button>
          ) : isOnSearchPage ? (
            <button
              onClick={handleLikeButton}
              className={
                isLiked
                  ? 'movies-card-list__icon movies-card-list__icon_type_liked'
                  : 'movies-card-list__icon movies-card-list__icon_type_disliked'
              }
            ></button>
          ) : null}
        </div>
        <img
          className="movies-card-list__image"
          alt={nameRU}
          src={
            isOnSearchPage
              ? `${imagesUrl}${image.formats.thumbnail.url}`
              : thumbnail
          }
        ></img>
      </div>
    </li>
  );
}

export default MoviesCard;
