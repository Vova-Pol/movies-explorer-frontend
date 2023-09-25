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
import {
  MOVIES_AMOUNT_SHOWN_LAPTOP,
  MOVIES_AMOUNT_SHOWN_MOBILE,
  MOVIES_AMOUNT_STEP_LAPTOP,
  MOVIES_AMOUNT_STEP_MOBILE,
  SHORT_MOVIE_DURATION,
} from '../../utils/constants';

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
  const showShortMoviesInitial = localStorage.getItem('last-search-data')
    ? JSON.parse(localStorage.getItem('last-search-data')).showShortMovies
    : false;

  const [showShortMovies, setShowShortMovies] = useState(
    showShortMoviesInitial,
  );

  function handleShortMoviesCheckbox() {
    const lastSearchData = localStorage.getItem('last-search-data')
      ? JSON.parse(localStorage.getItem('last-search-data'))
      : null;

    if (lastSearchData && !showShortMovies) {
      setMoviesList(lastSearchData.shortsMoviesList);
      setIsNothingFound(lastSearchData.shortsMoviesList.length === 0);
    } else if (lastSearchData && showShortMovies) {
      setMoviesList(lastSearchData.fullMoviesList);
      setIsNothingFound(lastSearchData.fullMoviesList.length === 0);
    }

    if (lastSearchData) {
      lastSearchData.showShortMovies = !lastSearchData.showShortMovies;
      localStorage.setItem('last-search-data', JSON.stringify(lastSearchData));
    }

    setShowShortMovies(!showShortMovies);
  }

  // Вывод фильмов в зависимости от разрешения

  useEffect(() => {
    if (isScreenLaptop) {
      setMoviesAmount(MOVIES_AMOUNT_SHOWN_LAPTOP);
      setMoviesAmountStep(MOVIES_AMOUNT_STEP_LAPTOP);
    } else if (isScreenMobile) {
      setMoviesAmount(MOVIES_AMOUNT_SHOWN_MOBILE);
      setMoviesAmountStep(MOVIES_AMOUNT_STEP_MOBILE);
    }
  }, []);

  // Вывод данных последнего поиска из Локального Хранилища

  useEffect(() => {
    if (localStorage.getItem('last-search-data')) {
      const { showShortMovies, fullMoviesList, shortsMoviesList } = JSON.parse(
        localStorage.getItem('last-search-data'),
      );
      setShowShortMovies(showShortMovies);
      setMoviesList(showShortMovies ? shortsMoviesList : fullMoviesList);
    }
    if (localStorage.getItem('saved-movies-list')) {
      setSavedMoviesList(JSON.parse(localStorage.getItem('saved-movies-list')));
    }
  }, []);

  // Кнопка "Найти"

  async function handleSearchForm(values) {
    try {
      localStorage.removeItem('last-search-data');

      setIsLoading(true);
      setIsNothingFound(false);
      setIsServerError(false);

      if (props.loggedIn) {
        if (localStorage.getItem('saved-movies-list')) {
          setSavedMoviesList(
            JSON.parse(localStorage.getItem('saved-movies-list')),
          );
        } else {
          const savedMoviesList = await mainApi.getSavedMovies();
          setSavedMoviesList(savedMoviesList.data);
          localStorage.setItem(
            'saved-movies-list',
            JSON.stringify(savedMoviesList.data),
          );
        }
      }

      const fetchedMoviesList = await getMoviesList();
      // Все фильмы по запросу
      const filteredMoviesList = fetchedMoviesList.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
          movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
      );
      // Только короткометражки
      const shortsMoviesList = filteredMoviesList.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION,
      );

      if (showShortMovies) {
        setMoviesList(shortsMoviesList);
        setIsNothingFound(shortsMoviesList.length === 0);
      } else {
        setMoviesList(filteredMoviesList);
        setIsNothingFound(filteredMoviesList.length === 0);
      }

      setIsLoading(false);

      const lastSearchData = {
        showShortMovies: showShortMovies,
        fullMoviesList: filteredMoviesList,
        shortsMoviesList: shortsMoviesList,
        searchInput: values.search,
      };

      localStorage.setItem('last-search-data', JSON.stringify(lastSearchData));
    } catch (err) {
      setIsLoading(false);
      setIsServerError(true);
      console.error(err);
    }
  }

  // Кнопка "Ещё"

  function handleMoreButton() {
    setMoviesAmount(moviesAmount + moviesAmountStep);
  }

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
