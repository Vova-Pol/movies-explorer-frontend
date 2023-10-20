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
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import {
  LAST_SEARCH_DATA_LS_KEY,
  MOVIES_AMOUNT_SHOWN_LAPTOP,
  MOVIES_AMOUNT_SHOWN_MOBILE,
  MOVIES_AMOUNT_STEP_LAPTOP,
  MOVIES_AMOUNT_STEP_MOBILE,
  SAVED_MOVIES_LIST_LS_KEY,
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
  const showShortMoviesInitial = isPresentInLs(LAST_SEARCH_DATA_LS_KEY)
    ? getFromLs(LAST_SEARCH_DATA_LS_KEY).showShortMovies
    : false;

  const [showShortMovies, setShowShortMovies] = useState(
    showShortMoviesInitial,
  );

  function handleShortMoviesCheckbox() {
    const lastSearchData = isPresentInLs(LAST_SEARCH_DATA_LS_KEY)
      ? getFromLs(LAST_SEARCH_DATA_LS_KEY)
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
      saveToLs(LAST_SEARCH_DATA_LS_KEY, lastSearchData);
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
    if (isPresentInLs(LAST_SEARCH_DATA_LS_KEY)) {
      const { showShortMovies, fullMoviesList, shortsMoviesList } = getFromLs(
        LAST_SEARCH_DATA_LS_KEY,
      );
      setShowShortMovies(showShortMovies);
      setMoviesList(showShortMovies ? shortsMoviesList : fullMoviesList);
    }
    if (isPresentInLs(SAVED_MOVIES_LIST_LS_KEY)) {
      setSavedMoviesList(getFromLs(SAVED_MOVIES_LIST_LS_KEY));
    }
  }, []);

  // Кнопка "Найти"

  async function handleSearchForm(values: ISearchFormValues) {
    try {
      removeFromLs(LAST_SEARCH_DATA_LS_KEY);

      setIsLoading(true);
      setIsNothingFound(false);
      setIsServerError(false);

      if (loggedIn) {
        if (isPresentInLs(SAVED_MOVIES_LIST_LS_KEY)) {
          setSavedMoviesList(getFromLs(SAVED_MOVIES_LIST_LS_KEY));
        } else {
          const savedMoviesList = await mainApi.getSavedMovies();
          setSavedMoviesList(savedMoviesList.data);
          saveToLs(SAVED_MOVIES_LIST_LS_KEY, savedMoviesList.data);
        }
      }

      const fetchedMoviesList = (await moviesApi.getMoviesList()).data;
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

      saveToLs(LAST_SEARCH_DATA_LS_KEY, lastSearchData);
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
