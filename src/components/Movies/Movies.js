import './Movies.css';
import { useEffect, useState } from 'react';
import useResize from '../../hooks/useResize';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from '../More/More';
import getMoviesList from '../../utils/MoviesApi';

function Movies() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [moviesAmount, setMoviesAmount] = useState(0);
  const [moviesAmountStep, setMoviesAmountStep] = useState(0);
  const { screenWidth, isScreenLaptop, isScreenMobile } = useResize();

  useEffect(() => {
    if (isScreenLaptop) {
      setMoviesAmount(7);
      setMoviesAmountStep(7);
    } else if (isScreenMobile) {
      setMoviesAmount(5);
      setMoviesAmountStep(5);
    }
  }, []);

  async function handleSearchForm(values) {
    try {
      setIsLoading(true);
      setIsNothingFound(false);
      setIsServerError(false);

      const moviesList = await getMoviesList();
      const filteredMoviesList = moviesList.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(values.search) ||
          movie.nameRU.toLowerCase().includes(values.search),
      );

      setMoviesList(filteredMoviesList);
      setIsNothingFound(filteredMoviesList.length === 0);

      setIsLoading(false);
    } catch (err) {
      setIsServerError(true);
      console.error(`Что-то пошло не так: ${err}`);
    }
  }

  function handleMoreButton() {
    setMoviesAmount(moviesAmount + moviesAmountStep);
  }

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm onHandleSubmit={handleSearchForm} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isSaved={false}
            moviesList={moviesList}
            nothingFound={isNothingFound}
            serverError={isServerError}
            moviesAmount={moviesAmount}
          />
        )}
        {moviesList.length >= moviesAmount ? (
          <More moviesList={moviesList} onLoadMoreMovies={handleMoreButton} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
