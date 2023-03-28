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
  const showShortMoviesInitial = localStorage.getItem('last-search-data')
    ? JSON.parse(localStorage.getItem('last-search-data')).showShortMovies
    : false;

  const [showShortMovies, setShowShortMovies] = useState(
    showShortMoviesInitial,
  );

  function handleShortMoviesCheckbox() {
    setShowShortMovies(!showShortMovies);
  }

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

  // Вывод данных последнего поиска из Локального Хранилища

  useEffect(() => {
    if (localStorage.getItem('last-search-data')) {
      const lastSearchData = JSON.parse(
        localStorage.getItem('last-search-data'),
      );
      setShowShortMovies(lastSearchData.showShortMovies);
      setMoviesList(lastSearchData.moviesList);
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

      const fetchedMoviesList = await getMoviesList();
      let searchResultMoviesList = fetchedMoviesList.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
          movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
      );

      if (showShortMovies) {
        searchResultMoviesList = searchResultMoviesList.filter(
          (movie) => movie.duration <= 40,
        );
      }

      setMoviesList(searchResultMoviesList);
      setIsNothingFound(searchResultMoviesList.length === 0);
      setIsLoading(false);

      const lastSearchData = {
        showShortMovies: showShortMovies,
        moviesList: searchResultMoviesList,
        searchInput: values.search,
      };

      localStorage.setItem('last-search-data', JSON.stringify(lastSearchData));
    } catch (err) {
      setIsServerError(true);
      console.error(`Что-то пошло не так: ${err}`);
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
