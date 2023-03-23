import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import countDuration from '../../utils/utils';
import { imagesUrl } from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';

function MoviesCard(props) {
  const isOnSearchPage = useLocation().pathname === '/movies';
  const isOnSavedPage = useLocation().pathname === '/saved-movies';

  // Общие пропсы для фильмов со moviesApi и mainApi.
  // В moviesApi айди обозначается как id, и thumbnail содержится в image,
  // а в mainApi айди обозначается _id, а thumbnail уже преобразован
  // в ссылку и сохранен в thumbnail
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

  // Кнопка лайк/дизлайк так же должна менять 'saved-movies-list'
  // в локальном хранилище

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
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      mainApi.deleteMovie(props.savedId).then((res) => {
        if (res) {
          setIsLiked(false);
        }
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
      .catch((err) => {
        console.error(err);
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
