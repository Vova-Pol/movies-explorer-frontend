import React, { FC } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import Navigation from '../Navigation/Navigation';
import LoginLink from '../LoginLink/LoginLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import MobileMenu from '../MobileMenu/MobileMenu';
import { RiMovie2Line } from 'react-icons/ri';
import { MAIN_PAGE_URL } from '../../utils/constants';

interface IHeaderProps {
  loggedIn: boolean;
}

const Header: FC<IHeaderProps> = ({ loggedIn }) => {
  const { isScreenLaptop, isScreenMobile, isScreenTablet } = useResize();

  return (
    <header className="header">
      <Link to={MAIN_PAGE_URL} className="header__logo">
        <RiMovie2Line className="header__logo-icon" />
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
