import './AboutMe.css';
import { Link } from 'react-router-dom';
import studentImg from '../../images/student.png';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <article className="about-me__article">
        <div className="about-me__article-container">
          <h3 className="about-me__article-title">Виталий</h3>
          <p className="about-me__article-subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__article-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="" className="about-me__article-link">
            Github
          </Link>
        </div>
        {/* <div className="about-me__image-container"> */}
        <img
          className="about-me__image"
          src={studentImg}
          alt="фото студента"
        ></img>
        {/* </div> */}
      </article>
      <h3 className="about-me__portfolio-title">Портфолио</h3>
      <ul className="about-me__portfolio-list">
        <li className="about-me__portfolio-item">
          <p className="about-me__portfolio-text">Статичный сайт</p>
          <Link to="" className="about-me__portfolio-link"></Link>
        </li>
        <div className="about-me__portfolio-line"></div>
        <li className="about-me__portfolio-item">
          <p className="about-me__portfolio-text">Адаптивный сайт</p>
          <Link to="" className="about-me__portfolio-link"></Link>
        </li>
        <div className="about-me__portfolio-line"></div>
        <li className="about-me__portfolio-item">
          <p className="about-me__portfolio-text">Одностраничное приложение</p>
          <Link to="" className="about-me__portfolio-link"></Link>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
