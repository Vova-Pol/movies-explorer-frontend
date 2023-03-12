import './AuthTop.css';
import { Link } from 'react-router-dom';

function AuthTop(props) {
  return (
    <div className="auth-top">
      <Link to="/" className="auth-top__logo"></Link>
      <h1 className="auth-top__title">{props.title}</h1>
    </div>
  );
}

export default AuthTop;
