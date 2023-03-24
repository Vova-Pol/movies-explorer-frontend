import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';

function SavedMovies(props) {
  const [moviesList, setMoviesList] = useState([]);
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

  return (
    <div className="saved-movies">
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm />
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
