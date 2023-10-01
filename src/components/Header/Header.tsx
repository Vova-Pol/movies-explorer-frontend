import React, { FC } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import Navigation from '../Navigation/Navigation';
import LoginLink from '../LoginLink/LoginLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import MobileMenu from '../MobileMenu/MobileMenu';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { MAIN_PAGE_URL } from '../../utils/constants';

interface IHeaderProps {
  loggedIn: boolean;
}

const Header: FC<IHeaderProps> = ({ loggedIn }) => {
  const { screenWidth, isScreenLaptop, isScreenMobile, isScreenTablet } =
    useResize();

  return (
    <header className="header">
      <Link to={MAIN_PAGE_URL} className="header__logo">
        <Logo />
      </Link>
      {!loggedIn ? (
        <LoginLink />
      ) : isScreenLaptop ? (
        <>
          <Navigation />
          <ProfileLink />
        </>
      ) : isScreenTablet || isScreenMobile ? (
        <MobileMenu />
      ) : null}
    </header>
  );
};

export default Header;
