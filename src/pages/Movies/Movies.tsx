import React, { FC } from 'react';
import './Movies.css';
import { useEffect, useState } from 'react';
import useResize from '../../hooks/useResize';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Preloader from '../../components/Preloader/Preloader';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import More from '../../components/More/More';
import getMoviesList from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import {
  MOVIES_AMOUNT_SHOWN_LAPTOP,
  MOVIES_AMOUNT_SHOWN_MOBILE,
  MOVIES_AMOUNT_STEP_LAPTOP,
  MOVIES_AMOUNT_STEP_MOBILE,
  SHORT_MOVIE_DURATION,
} from '../../utils/constants';
import { ISearchFormValues } from '../../types/search';
import { IMovie } from '../../types/movie';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IMoviesProps {
  loggedIn: boolean;
}

const Movies: FC<IMoviesProps> = ({ loggedIn }) => {
  const { screenWidth, isScreenLaptop, isScreenMobile } = useResize();
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [moviesAmount, setMoviesAmount] = useState(0);
  const [moviesAmountStep, setMoviesAmountStep] = useState(0);
  const { isPresentInLs, saveToLs, removeFromLs, getFromLs } =
    useLocalStorage();

  // Стейт и контроллер для переключателя "короткометражки"
  const showShortMoviesInitial = isPresentInLs('last-search-data')
    ? getFromLs('last-search-data').showShortMovies
    : false;

  const [showShortMovies, setShowShortMovies] = useState(
    showShortMoviesInitial,
  );

  function handleShortMoviesCheckbox() {
    const lastSearchData = isPresentInLs('last-search-data')
      ? getFromLs('last-search-data')
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
      saveToLs('last-search-data', lastSearchData);
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
    if (isPresentInLs('last-search-data')) {
      const { showShortMovies, fullMoviesList, shortsMoviesList } =
        getFromLs('last-search-data');
      setShowShortMovies(showShortMovies);
      setMoviesList(showShortMovies ? shortsMoviesList : fullMoviesList);
    }
    if (isPresentInLs('saved-movies-list')) {
      setSavedMoviesList(getFromLs('saved-movies-list'));
    }
  }, []);

  // Кнопка "Найти"

  async function handleSearchForm(values: ISearchFormValues) {
    try {
      removeFromLs('last-search-data');

      setIsLoading(true);
      setIsNothingFound(false);
      setIsServerError(false);

      if (loggedIn) {
        if (isPresentInLs('saved-movies-list')) {
          setSavedMoviesList(getFromLs('saved-movies-list'));
        } else {
          const savedMoviesList = await mainApi.getSavedMovies();
          setSavedMoviesList(savedMoviesList.data);
          saveToLs('saved-movies-list', savedMoviesList.data);
        }
      }

      const fetchedMoviesList = await getMoviesList();
      // Все фильмы по запросу
      const filteredMoviesList = fetchedMoviesList.filter(
        (movie: IMovie) =>
          movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
          movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
      );
      // Только короткометражки
      const shortsMoviesList = filteredMoviesList.filter(
        (movie: IMovie) => movie.duration <= SHORT_MOVIE_DURATION,
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

      saveToLs('last-search-data', lastSearchData);
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
      <Header loggedIn={loggedIn} />
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
            isNothingFound={isNothingFound}
            isServerError={isServerError}
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
};

export default Movies;
