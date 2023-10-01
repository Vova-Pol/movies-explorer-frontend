import React, { FC } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  const currentDate = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">Демонстрационный Full Stack проект</p>
      <div className="footer__line"></div>
      <div className="footer__container">
        <p className="footer__date">{currentDate.getFullYear()}</p>
        <div className="footer__links-container">
          <Link
            target="_blank"
            className="footer__link"
            to="https://github.com/Vova-Pol/movies-explorer-frontend"
          >
            Документация
          </Link>
          <Link
            target="_blank"
            className="footer__link"
            to="https://github.com/Vova-Pol/movies-explorer-frontend"
          >
            Технологии
          </Link>
          <Link
            target="_blank"
            className="footer__link"
            to="https://github.com/Vova-Pol/movies-explorer-frontend"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
