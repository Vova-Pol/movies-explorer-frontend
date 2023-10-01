import { useEffect, useState } from 'react';
import './Main.css';
import Header from '../../components/Header/Header';
import Promo from '../../components/Promo/Promo';
import Footer from '../../components/Footer/Footer';
import getMoviesList from '../../utils/MoviesApi';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MoviesCard from '../../components/MoviesCard/MoviesCard';
import { Latest } from '../../components/Latest/Latest';
import { BestAmerican } from '../../components/BestAmerican/BestAmerican';
import { BestBritish } from '../../components/BestBritish/BestBritish';

function Main(props) {
  const [latestMoviesList, setLatesMoviestList] = useState([]);
  const [bestAmericanMoviesList, setBestAmericanMoviesList] = useState([]);
  const [bestBritishMoviesList, setBestBritishMoviesList] = useState([]);

  useEffect(() => {
    getMoviesList().then((data) => {
      const latestMovies = data.filter((movie) => movie.year == '2016');
      setLatesMoviestList(latestMovies);

      const bestAmericanMovies = data.filter((movie) => movie.country == 'США');
      setBestAmericanMoviesList(bestAmericanMovies);

      const bestBritishMovies = data.filter(
        (movie) => movie.country == 'Великобритания',
      );
      setBestBritishMoviesList(bestBritishMovies);
    });
  }, []);

  console.log(latestMoviesList);
  return (
    <div className="main">
      {/* <Header loggedIn={props.loggedIn} /> */}
      <Header loggedIn={true} />
      <main>
        <Promo />
        <Latest moviesList={latestMoviesList} />
        <BestAmerican moviesList={bestAmericanMoviesList} />
        <BestBritish moviesList={bestBritishMoviesList} />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
