import './AuthSubmit.css';
import { Link } from 'react-router-dom';

function AuthSubmit(props) {
  const { formId, buttonText, suggestText, linkPath, linkText } = props;

  return (
    <div className="auth-submit">
      <button type="submit" from={formId} className="auth-submit__submit-btn">
        {buttonText}
      </button>
      <div className="auth-submit__suggest-container">
        <span className="auth-submit__suggest">{suggestText}</span>
        <Link to={linkPath} className="auth-submit__link">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default AuthSubmit;
