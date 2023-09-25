import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function SavedMovies(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

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

  function handleDeleteMovie(_id) {
    setMoviesList(moviesList.filter((movie) => movie._id !== _id));
  }

  function handleSearchForm(values) {
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
