import './Movies.css';
import { useContext, useEffect, useState } from 'react';
import useResize from '../../hooks/useResize';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import getMoviesList from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

function Movies(props) {
  const { screenWidth, isScreenLaptop, isScreenMobile } = useResize();
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [moviesAmount, setMoviesAmount] = useState(0);
  const [moviesAmountStep, setMoviesAmountStep] = useState(0);

  // Стейт и контроллер для переключателя "короткометражки"
  const [showShortMovies, setShowShortMovies] = useState(false);

  function handleShortMoviesCheckbox() {
    setShowShortMovies(!showShortMovies);
  }

  useEffect(() => {
    if (showShortMovies) {
      setMoviesList(moviesList.filter((movie) => movie.duration <= 40));
    } else if (localStorage.getItem('movies-list')) {
      setMoviesList(JSON.parse(localStorage.getItem('movies-list')));
    } else {
      setMoviesList([]);
    }
  }, [showShortMovies]);

  // Вывод фильмов в зависимости от разрешения

  useEffect(() => {
    if (isScreenLaptop) {
      setMoviesAmount(7);
      setMoviesAmountStep(7);
    } else if (isScreenMobile) {
      setMoviesAmount(5);
      setMoviesAmountStep(5);
    }
  }, []);

  // Вывод фильмов из Локального Хранилища

  useEffect(() => {
    if (localStorage.getItem('movies-list')) {
      setMoviesList(JSON.parse(localStorage.getItem('movies-list')));
    }
    if (localStorage.getItem('saved-movies-list')) {
      setSavedMoviesList(JSON.parse(localStorage.getItem('saved-movies-list')));
    }
  }, []);

  // Кнопка "Найти"

  async function handleSearchForm(values) {
    try {
      localStorage.removeItem('movies-list');
      localStorage.removeItem('search-input-value');

      setIsLoading(true);
      setIsNothingFound(false);
      setIsServerError(false);

      if (localStorage.removeItem('saved-movies-list')) {
        setSavedMoviesList(
          JSON.parse(localStorage.removeItem('saved-movies-list')),
        );
      } else {
        const savedMoviesList = await mainApi.getSavedMovies();
        setSavedMoviesList(savedMoviesList.data);
        localStorage.setItem(
          'saved-movies-list',
          JSON.stringify(savedMoviesList.data),
        );
      }

      const moviesList = await getMoviesList();
      const filteredMoviesList = moviesList.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
          movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
      );

      setMoviesList(filteredMoviesList);
      setIsNothingFound(filteredMoviesList.length === 0);
      setIsLoading(false);

      localStorage.setItem('movies-list', JSON.stringify(filteredMoviesList));
      localStorage.setItem('search-input-value', values.search);
    } catch (err) {
      setIsServerError(true);
      console.error(`Что-то пошло не так: ${err}`);
    }
  }

  // Кнопка "Ещё"

  function handleMoreButton() {
    setMoviesAmount(moviesAmount + moviesAmountStep);
  }

  // Кнопка лайк/дизлайк так же должна менять 'saved-movies-list'
  // в локальном хранилище

  return (
    <div className="movies">
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          onHandleSubmit={handleSearchForm}
          isChecked={showShortMovies}
          onHandleCheckbox={handleShortMoviesCheckbox}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesList={moviesList}
            nothingFound={isNothingFound}
            serverError={isServerError}
            moviesAmount={moviesAmount}
            savedMoviesList={savedMoviesList}
            isShortMovies={showShortMovies}
          />
        )}
        {moviesList.length >= moviesAmount ? (
          <More onLoadMoreMovies={handleMoreButton} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
