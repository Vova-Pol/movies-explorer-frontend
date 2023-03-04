import '../App/App.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="login-register">
      <div className="login-register__top">
        <div className="login-register__logo"></div>
        <h1 className="login-register__title">Добро пожаловать!</h1>
      </div>
      <form className="login-register__form">
        <label for="name" className="login-register__label">
          Имя
        </label>
        <input
          type="text"
          name="name"
          className="login-register__input"
        ></input>
        <span className="login-register__error-text"></span>
        <label for="email" className="login-register__label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="login-register__input"
        ></input>
        <span className="login-register__error-text"></span>
        <label for="password" className="login-register__label">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className="login-register__input"
        ></input>
        <span className="login-register__error-text">
          Что-то пошло не так...
        </span>
        <button type="submit" className="login-register__submit-btn">
          Зарегистрироваться
        </button>
        <div className="login-register__login-suggest-container">
          <span className="login-register__login-suggest">
            Уже зарегистрированы?
          </span>
          <Link to="/signin" className="login-register__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
