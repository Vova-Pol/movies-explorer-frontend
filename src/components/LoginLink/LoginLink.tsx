import React from 'react';
import './LoginLink.css';
import { Link } from 'react-router-dom';
import { REGISTER_PAGE_URL, LOGIN_PAGE_URL } from '../../utils/constants';
import { FC } from 'react';

const LoginLink: FC = () => {
  return (
    <div className="login-link">
      <Link to={REGISTER_PAGE_URL} className="login-link__regestration">
        Регистрация
      </Link>
      <Link to={LOGIN_PAGE_URL} className="login-link__login">
        Вход
      </Link>
    </div>
  );
};

export default LoginLink;
