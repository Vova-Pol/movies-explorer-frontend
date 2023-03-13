import './ProfileLink.css';
import { Link } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../../images/account-icon.svg';

function ProfileLink() {
  return (
    <div className="profile-link">
      <Link to="/profile" className="profile-link__link">
        Аккаунт
      </Link>
      <AccountIcon />
    </div>
  );
}

export default ProfileLink;
