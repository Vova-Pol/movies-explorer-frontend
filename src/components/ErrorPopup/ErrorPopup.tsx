import { useEffect, useState } from 'react';
import './ErrorPopup.css';

function ErrorPopup(props) {
  const [isShown, setIsShown] = useState(false);

  // Плавное появление
  useEffect(() => {
    setIsShown(true);
    return () => {
      setIsShown(false);
    };
  }, []);

  function handleCloseButton() {
    props.onCloseErrorPopup();
  }
  return (
    <div
      className={isShown ? 'error-popup error-popup_type_shown' : 'error-popup'}
    >
      <div className="error-popup__container">
        <span className="error-popup__text">
          Произошла ошибка на сервере. Перезагрузите страницу и попробуйте
          снова.
        </span>
        <button className="error-popup__close-btn" onClick={handleCloseButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
