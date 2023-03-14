import movie1 from '../images/movie-1.png';
import movie2 from '../images/movie-2.png';
import movie3 from '../images/movie-3.png';
import movie4 from '../images/movie-4.png';
import movie5 from '../images/movie-5.png';
import movie6 from '../images/movie-6.png';
import movie7 from '../images/movie-7.png';

export const movies = [
  {
    title: '33 слова о дизайне',
    duration: '1ч45м',
    imgLink: movie1,
    isLiked: false,
    _id: 1,
  },
  {
    title: 'Киноальманах «100 лет дизайна»',
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
  {
    title: 'Баския: Взрыв реальности',
    duration: '3ч35м',
    imgLink: movie4,
    isLiked: false,
    _id: 4,
  },
  {
    title: 'Бег это свобода',
    duration: '2ч15м',
    imgLink: movie5,
    isLiked: true,
    _id: 5,
  },
  {
    title: 'Книготорговцы',
    duration: '0ч55м',
    imgLink: movie6,
    isLiked: true,
    _id: 6,
  },
  {
    title: 'Когда я думаю о Германии ночью',
    duration: '2ч15м',
    imgLink: movie7,
    isLiked: true,
    _id: 7,
  },
  {
    title: 'Восьмой фильм',
    duration: '0ч55м',
    imgLink: movie1,
    isLiked: true,
    _id: 8,
  },
];

export const savedMovies = movies.filter((movie) => movie._id <= 3);
