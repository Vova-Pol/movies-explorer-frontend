import './ProfileLink.css';
import { Link } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../../images/account-icon.svg';
import { PROFILE_PAGE_URL } from '../../utils/constants';

function ProfileLink() {
  return (
    <div className="profile-link">
      <Link to={PROFILE_PAGE_URL} className="profile-link__link">
        Аккаунт
      </Link>
      <AccountIcon />
    </div>
  );
}

export default ProfileLink;
