import React from 'react';
import { FC } from 'react';
import './AuthTop.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { MAIN_PAGE_URL } from '../../utils/constants';

interface IAuthTopProps {
  title: string;
}

const AuthTop: FC<IAuthTopProps> = ({ title }) => {
  return (
    <div className="auth-top">
      <Link to={MAIN_PAGE_URL} className="auth-top__logo">
        <Logo />
      </Link>
      <h1 className="auth-top__title">{title}</h1>
    </div>
  );
};

export default AuthTop;
