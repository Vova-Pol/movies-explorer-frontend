import React, { FC, FormEvent } from 'react';
import './Login.css';
import AuthTop from '../../components/AuthTop/AuthTop';
import AuthBottom from '../../components/AuthBottom/AuthBottom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {
  REGISTER_PAGE_URL,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_NAME,
} from '../../utils/constants';
import { ILoginFormValues } from '../../types/auth';

interface ILoginProps {
  handleLogin: (values: ILoginFormValues) => void;
  serverErrorText: string;
}

const Login: FC<ILoginProps> = ({ handleLogin, serverErrorText }) => {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      username: '',
      password: '',
    });

  const formGreeting = 'Рады видеть!';
  const suggestText = 'Ещё не зарегистрированы?';
  const linkPath = REGISTER_PAGE_URL;
  const linkText = 'Регистрация';

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    handleLogin(values);
  }

  return (
    <div className="login">
      <AuthTop title={formGreeting} />

      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="username" className="login__label">
          Имя
        </label>
        <input
          type="text"
          name="username"
          className="login__input"
          onChange={handleChange}
          value={values.username}
          required
          // pattern={REGEX_NAME.source}
        ></input>
        <span className="login__error-text">
          {isValid ? '' : errors.username}
        </span>

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
          minLength={8}
          pattern={REGEX_PASSWORD.source}
        ></input>
        <span className="login__error-text">
          {isValid ? '' : errors.password}
        </span>
        <p className="login__server-error-text">{serverErrorText}</p>

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
};

export default Login;
