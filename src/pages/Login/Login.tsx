import React, { FC } from 'react';
import './Login.css';
import AuthTop from '../../components/AuthTop/AuthTop';
import AuthBottom from '../../components/AuthBottom/AuthBottom';
import { REGISTER_PAGE_URL, LOGIN_CONFIG } from '../../utils/constants';
import { ILoginFormValues } from '../../types/auth';
import { AuthForm } from '../../components/AuthForm/AuthForm';

interface ILoginProps {
  handleLogin: (values: ILoginFormValues) => void;
  errorText: string;
}

const Login: FC<ILoginProps> = ({ handleLogin, errorText }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const formGreeting = 'Рады видеть!';
  const suggestText = 'Ещё не зарегистрированы?';
  const linkPath = REGISTER_PAGE_URL;
  const linkText = 'Регистрация';

  function handleSubmit(values: ILoginFormValues) {
    handleLogin(values);
  }

  return (
    <div className="login">
      <AuthTop title={formGreeting} />

      <AuthForm
        initialValues={initialValues}
        formConfig={LOGIN_CONFIG}
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

export default Login;
