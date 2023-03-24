import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function SavedMovies(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const isServerError = false;

  useEffect(() => {
    mainApi.getSavedMovies().then((res) => {
      if (res) {
        setMoviesList(res.data);
      }
    });
  }, []);

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
        <SearchForm onHandleSubmit={handleSearchForm} />
        <MoviesCardList
          moviesList={moviesList}
          moviesAmount={moviesList.length}
          nothingFound={isNothingFound}
          serverError={isServerError}
          onDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
