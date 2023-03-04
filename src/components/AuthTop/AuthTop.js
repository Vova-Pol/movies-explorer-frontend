import './AuthTop.css';

function AuthTop(props) {
  return (
    <div className="auth-top">
      <div className="auth-top__logo"></div>
      <h1 className="auth-top__title">{props.title}</h1>
    </div>
  );
}

export default AuthTop;
