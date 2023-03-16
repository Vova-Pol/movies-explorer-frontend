import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import getMoviesList from '../../utils/MoviesApi';

function SavedMovies() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const moviesAmount = 7;

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList
          isSaved={true}
          moviesList={moviesList}
          moviesAmount={moviesAmount}
        />
        <More moviesList={moviesList} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
