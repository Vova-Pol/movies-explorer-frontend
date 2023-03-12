import './AuthForm.css';
import { Link } from 'react-router-dom';

function AuthForm(props) {
  const { inputsList, buttonText, suggestText, linkPath, linkText } = props;
  return (
    <form className="auth-form">
      <div className="auth-form__inputs-container">
        {inputsList.map((input, index) => {
          return (
            <div className="auth-form__input-box" key={index}>
              <label htmlFor={input.name} className="auth-form__label">
                {input.title}
              </label>
              <input
                type={input.type}
                name={input.name}
                className="auth-form__input"
              ></input>
              <span className="auth-form__error-text"></span>
            </div>
          );
        })}
      </div>
      <button type="submit" className="auth-form__submit-btn">
        {buttonText}
      </button>
      <div className="auth-form__suggest-container">
        <span className="auth-form__suggest">{suggestText}</span>
        <Link to={linkPath} className="auth-form__link">
          {linkText}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
