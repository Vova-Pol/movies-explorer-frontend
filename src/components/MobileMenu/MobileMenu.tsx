import React, { FC } from 'react';
import './MobileMenu.css';
import Navigation from '../Navigation/Navigation';
import ProfileLink from '../ProfileLink/ProfileLink';

const MobileMenu: FC = () => {
  return (
    <div className="mobile-menu">
      <input type="checkbox" className="mobile-menu__toggle"></input>
      <div className="mobile-menu__icon"></div>
      <div className="mobile-menu__background"></div>
      <div className="mobile-menu__menu">
        <Navigation />
        <ProfileLink />
      </div>
    </div>
  );
};

export default MobileMenu;
