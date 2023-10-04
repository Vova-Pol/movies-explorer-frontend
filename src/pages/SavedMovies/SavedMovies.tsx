import React, { FC } from 'react';
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import {
  SAVED_MOVIES_LIST_LS_KEY,
  SHORT_MOVIE_DURATION,
} from '../../utils/constants';
import { ISavedMovie } from '../../types/movie';
import { ISearchFormValues } from '../../types/search';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ISavedMoviesProps {
  loggedIn: boolean;
}

const SavedMovies: FC<ISavedMoviesProps> = ({ loggedIn }) => {
  const [moviesList, setMoviesList] = useState<ISavedMovie[]>([]);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const { saveToLs } = useLocalStorage();

  // Запрос к сохраннемнным фильмам
  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setMoviesList(res.data);
          saveToLs(SAVED_MOVIES_LIST_LS_KEY, res.data);
        }
      })
      .catch((err) => {
        setIsServerError(true);
        console.error(err);
      });
  }, []);

  // Стейт и контроллер для переключателя "короткометражки"
  const [showShortMovies, setShowShortMovies] = useState(false);

  function handleShortMoviesCheckbox() {
    setShowShortMovies(!showShortMovies);
  }

  function handleDeleteMovie(id: number) {
    setMoviesList(moviesList.filter((movie) => movie.id !== id));
  }

  function handleSearchForm(values: ISearchFormValues) {
    let filteredMoviesList = moviesList.filter(
      (movie) =>
        movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
    );

    if (showShortMovies) {
      filteredMoviesList = filteredMoviesList.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION,
      );
    }

    setMoviesList(filteredMoviesList);
    setIsNothingFound(filteredMoviesList.length === 0);
  }

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          onHandleSubmit={handleSearchForm}
          isChecked={showShortMovies}
          onHandleCheckbox={handleShortMoviesCheckbox}
        />
        <MoviesCardList
          savedMoviesList={moviesList}
          moviesAmount={moviesList.length}
          isNothingFound={isNothingFound}
          isServerError={isServerError}
          onDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SavedMovies;
