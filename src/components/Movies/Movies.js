import './Movies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import { movies } from '../../utils/data';

function Movies() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList isSaved={false} moviesList={movies} />
      <More moviesList={movies} />
      <Footer />
    </div>
  );
}

export default Movies;
