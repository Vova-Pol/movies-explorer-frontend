import './Header.css';
import { Link } from 'react-router-dom';
import useResize from '../../hooks/use-resize';
import Navigation from '../Navigation/Navigation';
import LoginLink from '../LoginLink/LoginLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header(props) {
  const { loggedIn } = props;

  const { screenWidth, isScreenLaptop, isScreenMobile, isScreenTablet } =
    useResize();

  return (
    <header className="header">
      <Link className="header__logo"></Link>
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
}

export default Header;
