import './AuthForm.css';

function AuthForm(props) {
  const { inputsList, formId } = props;
  return (
    <form className="auth-form" id={formId}>
      {inputsList.map((input) => {
        return (
          <>
            <label for={input.name} className="auth-form__label">
              {input.title}
            </label>
            <input
              type={input.type}
              name={input.name}
              className="auth-form__input"
            ></input>
            <span className="auth-form__error-text"></span>
          </>
        );
      })}
    </form>
  );
}

export default AuthForm;
