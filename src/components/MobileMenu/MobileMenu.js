import './MobileMenu.css';

function MobileMenu() {
  return (
    <div className="mobile-menu">
      <input type="checkbox" className="mobile-menu__toggle"></input>
      <div className="mobile-menu__icon"></div>
    </div>
  );
}

export default MobileMenu;
