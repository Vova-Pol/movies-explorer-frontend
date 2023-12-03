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
  REGISTER_CONFIG,
} from '../../utils/constants';
import { AuthForm } from '../../components/AuthForm/AuthForm';

interface IRegisterProps {
  handleRegister: (values: IRegisterFormValues) => void;
  errorText: string;
}

const Register: FC<IRegisterProps> = ({ handleRegister, errorText }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const formGreeting = 'Добро пожаловать!';
  const suggestText = 'Уже зарегистрированы?';
  const linkPath = LOGIN_PAGE_URL;
  const linkText = 'Войти';

  function handleSubmit(values: IRegisterFormValues) {
    handleRegister(values);
  }

  return (
    <div className="register">
      <AuthTop title={formGreeting} />

      <AuthForm<IRegisterFormValues>
        initialValues={initialValues}
        formConfig={REGISTER_CONFIG}
        onSubmit={handleSubmit}
        errorText={errorText}
      />

      <AuthBottom
        suggestText={suggestText}
        linkPath={linkPath}
        linkText={linkText}
      />
    </div>
  );
};

export default Register;
