import './Register.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthBottom from '../AuthBottom/AuthBottom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { nameRegex, emailRegex, passwordRegex } from '../../utils/constants';

function Register(props) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      name: '',
      email: '',
      password: '',
    });

  const formGreeting = 'Добро пожаловать!';
  const suggestText = 'Уже зарегистрированы?';
  const linkPath = '/signin';
  const linkText = 'Войти';

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister(values);
  }

  return (
    <div className="register">
      <AuthTop title={formGreeting} />

      <form className="register__form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="name" className="register__label">
          Имя
        </label>
        <input
          type="text"
          name="name"
          className="register__input"
          onChange={handleChange}
          value={values.name}
          required
          minLength="2"
          maxLength="30"
          pattern={nameRegex.source}
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.name}
        </span>

        <label htmlFor="email" className="register__label">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="register__input"
          onChange={handleChange}
          value={values.email}
          required
          pattern={emailRegex.source}
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.email}
        </span>

        <label htmlFor="password" className="register__label">
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className="register__input"
          onChange={handleChange}
          value={values.password}
          required
          minLength="8"
          pattern={passwordRegex.source}
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.password}
        </span>

        <button
          type="submit"
          className="register__submit-btn"
          disabled={isValid ? false : true}
        >
          Зарегистрироваться
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

export default Register;
