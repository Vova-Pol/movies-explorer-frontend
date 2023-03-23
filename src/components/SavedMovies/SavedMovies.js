import './SavedMovies.css';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import { mainApi } from '../../utils/MainApi';

function SavedMovies() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const moviesAmount = 7;
  const isNothingFound = false;
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

  // Не работает форма поиска
  // Что делать с кнопкой Ещё?

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList
          moviesList={moviesList}
          moviesAmount={moviesAmount}
          nothingFound={isNothingFound}
          serverError={isServerError}
          onDeleteMovie={handleDeleteMovie}
        />
        {moviesList.length > 7 ? <More /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
