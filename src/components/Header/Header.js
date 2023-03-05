import './Header.css';
import useResize from '../../hooks/use-resize';
import Navigation from '../Navigation/Navigation';
import LoginLink from '../LoginLink/LoginLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useEffect } from 'react';

function Header(props) {
  const { loggedIn } = props;

  const { screenWidth, isScreenLaptop, isScreenMobile, isScreenTablet } =
    useResize();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {isScreenLaptop && loggedIn ? (
        <>
          <Navigation />
          <ProfileLink />
        </>
      ) : !loggedIn ? (
        <LoginLink />
      ) : (isScreenTablet || isScreenMobile) && loggedIn ? (
        <BurgerMenu />
      ) : !loggedIn ? (
        <LoginLink />
      ) : null}
      {/* {loggedIn ? <Navigation /> : null}
      {loggedIn ? <ProfileLink /> : <LoginLink />} */}
    </header>
  );
}

export default Header;
