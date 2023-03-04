import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register">
      <div className="register__top">
        <div className="register__logo"></div>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>
      <form className="register__form">
        <label for="name" className="register__label">
          Имя
        </label>
        <input type="text" name="name" className="register__input"></input>
        <span className="register__error-text"></span>
        <label for="email" className="register__label">
          E-mail
        </label>
        <input type="email" name="email" className="register__input"></input>
        <span className="register__error-text"></span>
        <label for="password" className="register__label">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className="register__input"
        ></input>
        <span className="register__error-text">Что-то пошло не так...</span>
        <button type="submit" className="register__submit-btn">
          Зарегистрироваться
        </button>
        <div className="register__login-suggest-container">
          <span className="register__login-suggest">Уже зарегистрированы?</span>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
