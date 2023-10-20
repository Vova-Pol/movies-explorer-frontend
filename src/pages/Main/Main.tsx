import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import './Main.css';
import Header from '../../components/Header/Header';
import Promo from '../../components/Promo/Promo';
import Footer from '../../components/Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import Latest from '../../components/Latest/Latest';
import BestAmerican from '../../components/BestAmerican/BestAmerican';
import BestBritish from '../../components/BestBritish/BestBritish';
import { IMovie } from '../../types/movie';

interface IMainProps {
  loggedIn: boolean;
}

const Main: FC<IMainProps> = ({ loggedIn }) => {
  const [latestMoviesList, setLatesMoviestList] = useState([]);
  const [bestAmericanMoviesList, setBestAmericanMoviesList] = useState([]);
  const [bestBritishMoviesList, setBestBritishMoviesList] = useState([]);

  useEffect(() => {
    moviesApi.getMoviesList().then((res) => {
      const latestMovies = res.data.filter(
        (movie: IMovie) => movie.year == '2016',
      );
      setLatesMoviestList(latestMovies);

      const bestAmericanMovies = res.data.filter(
        (movie: IMovie) => movie.country == 'США',
      );
      setBestAmericanMoviesList(bestAmericanMovies);

      const bestBritishMovies = res.data.filter(
        (movie: IMovie) => movie.country == 'Великобритания',
      );
      setBestBritishMoviesList(bestBritishMovies);
    });
  }, []);

  return (
    <div className="main">
      <Header loggedIn={loggedIn} />
      <main>
        <Promo />
        <Latest moviesList={latestMoviesList} />
        <BestAmerican moviesList={bestAmericanMoviesList} />
        <BestBritish moviesList={bestBritishMoviesList} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
