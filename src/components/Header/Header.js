import './Header.css';
import Navigation from '../Navigation/Navigation';
import LoginLink from '../LoginLink/LoginLink';
import ProfileLink from '../ProfileLink/ProfileLink';

function Header(props) {
  const { loggedIn } = props;

  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? <Navigation /> : null}
      {loggedIn ? <ProfileLink /> : <LoginLink />}
    </header>
  );
}

export default Header;
