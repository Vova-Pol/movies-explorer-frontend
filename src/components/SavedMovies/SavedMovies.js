import './SavedMovies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import { savedMovies } from '../../utils/data';

function SavedMovies() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main>
        <MoviesCardList isSaved={true} moviesList={savedMovies} />
        <More moviesList={savedMovies} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
