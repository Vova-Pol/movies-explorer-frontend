import React, { FC } from 'react';
import './AuthBottom.css';
import { Link } from 'react-router-dom';

const AuthBottom: FC = (props) => {
  return (
    <div className="auth-bottom__suggest-container">
      <span className="auth-bottom__suggest">{props.suggestText}</span>
      <Link to={props.linkPath} className="auth-bottom__link">
        {props.linkText}
      </Link>
    </div>
  );
};

export default AuthBottom;
