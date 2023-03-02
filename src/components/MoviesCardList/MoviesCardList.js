import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movie1 from '../../images/movie-1.png';
import movie2 from '../../images/movie-2.png';
import movie3 from '../../images/movie-3.png';

function MoviesCardList() {
  const movies = [
    {
      title: '33 слова о дизайне',
      duration: '1ч45м',
      imgLink: movie1,
      isLiked: false,
      _id: 1,
    },
    {
      title: 'Бег это свобода',
      duration: '2ч15м',
      imgLink: movie2,
      isLiked: true,
      _id: 2,
    },
    {
      title: 'В погоне за Бенкси',
      duration: '0ч55м',
      imgLink: movie3,
      isLiked: true,
      _id: 3,
    },
  ];

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((card) => {
          return (
            <MoviesCard
              key={card._id}
              title={card.title}
              duration={card.duration}
              imgLink={card.imgLink}
              isLiked={card.isLiked}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
