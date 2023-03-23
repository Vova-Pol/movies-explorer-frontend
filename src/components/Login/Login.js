import './Login.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthBottom from '../AuthBottom/AuthBottom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { emailRegex, passwordRegex } from '../../utils/constants';

function Login(props) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  const formGreeting = 'Рады видеть!';
  const suggestText = 'Ещё не зарегистрированы?';
  const linkPath = '/signup';
  const linkText = 'Регистрация';

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogin(values);
  }

  return (
    <div className="login">
      <AuthTop title={formGreeting} />

      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="email" className="login__label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="login__input"
          onChange={handleChange}
          value={values.email}
          required
          pattern={emailRegex.source}
        ></input>
        <span className="login__error-text">{isValid ? '' : errors.email}</span>

        <label htmlFor="password" className="login__label">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className="login__input"
          onChange={handleChange}
          value={values.password}
          required
          minLength="8"
          pattern={passwordRegex.source}
        ></input>
        <span className="login__error-text">
          {isValid ? '' : errors.password}
        </span>
        <p className="login__server-error-text">{props.serverErrorText}</p>

        <button
          type="submit"
          className="login__submit-btn"
          disabled={isValid ? false : true}
        >
          Войти
        </button>
      </form>

      <AuthBottom
        suggestText={suggestText}
        linkPath={linkPath}
        linkText={linkText}
      />
    </div>
  );
}

export default Login;
