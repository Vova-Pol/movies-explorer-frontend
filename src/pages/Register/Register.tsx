import React, { FC, FormEvent } from 'react';
import './Register.css';
import AuthTop from '../../components/AuthTop/AuthTop';
import AuthBottom from '../../components/AuthBottom/AuthBottom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { IRegisterFormValues } from '../../types/auth';
import {
  LOGIN_PAGE_URL,
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD,
} from '../../utils/constants';

interface IRegisterProps {
  handleRegister: (values: IRegisterFormValues) => void;
  serverErrorText: string;
}

const Register: FC<IRegisterProps> = ({ handleRegister, serverErrorText }) => {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      username: '',
      email: '',
      password: '',
    });

  const formGreeting = 'Добро пожаловать!';
  const suggestText = 'Уже зарегистрированы?';
  const linkPath = LOGIN_PAGE_URL;
  const linkText = 'Войти';

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    handleRegister(values);
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
          name="username"
          className="register__input"
          onChange={handleChange}
          value={values.username}
          required
          minLength={2}
          maxLength={30}
          pattern={REGEX_NAME.source}
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.username}
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
          pattern={REGEX_EMAIL.source}
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
          minLength={8}
          pattern={REGEX_PASSWORD.source}
        ></input>
        <span className="register__error-text">
          {isValid ? '' : errors.password}
        </span>

        <p className="register__server-error-text">{serverErrorText}</p>

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
};

export default Register;
