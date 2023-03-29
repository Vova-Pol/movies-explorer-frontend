import './Navigation.css';
import { Link } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import {
  MAIN_PAGE_URL,
  MOVIES_PAGE_URL,
  SAVED_MOVIES_PAGE_URL,
} from '../../utils/constants';

function Navigation() {
  const { isScreenTablet, isScreenMobile } = useResize();

  return (
    <nav className="navigation">
      {isScreenMobile || isScreenTablet ? (
        <Link to={MAIN_PAGE_URL} className="navigation__link">
          Главная
        </Link>
      ) : null}
      <Link to={MOVIES_PAGE_URL} className="navigation__link">
        Фильмы
      </Link>
      <Link to={SAVED_MOVIES_PAGE_URL} className="navigation__link">
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default Navigation;
