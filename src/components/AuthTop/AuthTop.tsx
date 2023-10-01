import React from 'react';
import { FC } from 'react';
import './AuthTop.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { MAIN_PAGE_URL } from '../../utils/constants';

const AuthTop: FC = (props) => {
  return (
    <div className="auth-top">
      <Link to={MAIN_PAGE_URL} className="auth-top__logo">
        <Logo />
      </Link>
      <h1 className="auth-top__title">{props.title}</h1>
    </div>
  );
};

export default AuthTop;
