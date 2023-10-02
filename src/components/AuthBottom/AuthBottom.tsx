import React, { FC } from 'react';
import './AuthBottom.css';
import { Link } from 'react-router-dom';

interface IAuthBottomProps {
  suggestText: string;
  linkPath: string;
  linkText: string;
}

const AuthBottom: FC<IAuthBottomProps> = ({
  suggestText,
  linkPath,
  linkText,
}) => {
  return (
    <div className="auth-bottom__suggest-container">
      <span className="auth-bottom__suggest">{suggestText}</span>
      <Link to={linkPath} className="auth-bottom__link">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthBottom;
