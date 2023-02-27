import './ProfileLink.css';
import { Link } from 'react-router-dom';

function ProfileLink() {
  return (
    <div className="profile-link">
      <Link to="/profile" className="profile-link__link">
        Аккаунт
      </Link>
      <div className="profile-link__icon"></div>
    </div>
  );
}

export default ProfileLink;
