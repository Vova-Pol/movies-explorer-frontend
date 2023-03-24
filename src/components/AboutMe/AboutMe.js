import './AboutMe.css';
import { Link } from 'react-router-dom';
import studentImg from '../../images/student.png';
import { ReactComponent as ArrowIcon } from '../../images/icon-arrow.svg';

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
        <img
          className="about-me__image"
          src={studentImg}
          alt="фото студента"
        ></img>
      </article>
      <h3 className="about-me__portfolio-title">Портфолио</h3>
      <ul className="about-me__portfolio-list">
        <li>
          <Link
            to="https://github.com/Vova-Pol?tab=repositories"
            className="about-me__portfolio-link"
          >
            <p className="about-me__portfolio-text">Статичный сайт</p>
            <span className="about-me__portfolio-arrow"></span>
          </Link>
        </li>
        <div className="about-me__portfolio-line"></div>
        <li>
          <Link
            to="https://github.com/Vova-Pol?tab=repositories"
            className="about-me__portfolio-link"
          >
            <p className="about-me__portfolio-text">Адаптивный сайт</p>
            <span className="about-me__portfolio-arrow"></span>
          </Link>
        </li>
        <div className="about-me__portfolio-line"></div>
        <li>
          <Link
            to="https://github.com/Vova-Pol?tab=repositories"
            className="about-me__portfolio-link"
          >
            <p className="about-me__portfolio-text">
              Одностраничное приложение
            </p>
            <span className="about-me__portfolio-arrow"></span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
