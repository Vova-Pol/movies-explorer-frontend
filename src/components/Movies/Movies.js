import './Movies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <Preloader />
      <Footer />
    </div>
  );
}

export default Movies;
