import './SavedMovies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';

function SavedMovies() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList isSaved={true} moviesList={moviesList} />
        <More moviesList={moviesList} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
