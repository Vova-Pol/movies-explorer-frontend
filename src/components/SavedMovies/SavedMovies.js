import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function SavedMovies(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const isServerError = false;

  // Запрос к сохраннемнным фильмам
  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setMoviesList(res.data);
          localStorage.setItem('saved-movies-list', JSON.stringify(res.data));
        }
      })
      .catch((errStatus) => {
        console.error(errStatus);
      });
  }, []);

  // Стейт и контроллер для переключателя "короткометражки"
  const [showShortMovies, setShowShortMovies] = useState(false);

  function handleShortMoviesCheckbox() {
    setShowShortMovies(!showShortMovies);
  }

  useEffect(() => {
    if (showShortMovies) {
      setMoviesList(moviesList.filter((movie) => movie.duration <= 40));
    } else {
      setMoviesList(JSON.parse(localStorage.getItem('saved-movies-list')));
    }
  }, [showShortMovies]);

  function handleDeleteMovie(_id) {
    setMoviesList(moviesList.filter((movie) => movie._id !== _id));
  }

  function handleSearchForm(values) {
    const foundMoviesList = moviesList.filter(
      (movie) =>
        movie.nameEN.toLowerCase().includes(values.search.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(values.search.toLowerCase()),
    );
    setMoviesList(foundMoviesList);
    if (foundMoviesList.length === 0) {
      setIsNothingFound(true);
    }
  }

  return (
    <div className="saved-movies">
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          onHandleSubmit={handleSearchForm}
          isChecked={showShortMovies}
          onHandleCheckbox={handleShortMoviesCheckbox}
        />
        <MoviesCardList
          moviesList={moviesList}
          moviesAmount={moviesList.length}
          nothingFound={isNothingFound}
          serverError={isServerError}
          onDeleteMovie={handleDeleteMovie}
          isShortMovies={showShortMovies}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
