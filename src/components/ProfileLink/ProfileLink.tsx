import React from 'react';
import './ProfileLink.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { PROFILE_PAGE_URL } from '../../utils/constants';
import { FC } from 'react';

const ProfileLink: FC = () => {
  return (
    <div className="profile-link">
      <Link to={PROFILE_PAGE_URL} className="profile-link__link">
        Аккаунт
      </Link>
      <FaUserCircle />
    </div>
  );
};

export default ProfileLink;
