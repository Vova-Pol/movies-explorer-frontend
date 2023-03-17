import './Register.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthBottom from '../AuthBottom/AuthBottom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register() {
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

  return (
    <div className="register">
      <AuthTop title={formGreeting} />

      <form className="register__form" noValidate>
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
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.password}
        </span>

        <button type="submit" className="register__submit-btn">
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
