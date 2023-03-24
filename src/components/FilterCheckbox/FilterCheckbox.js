import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox() {
  const [showShortMovies, setShowShortMovies] = useState(true);

  function handleCheckbox() {
    setShowShortMovies(!showShortMovies);
  }
  return (
    <div className="search-form__checkbox-container">
      <label className="search-form__filter-checkbox">
        <input
          className="search-form__switch-input"
          type="checkbox"
          checked={showShortMovies}
          onChange={handleCheckbox}
        ></input>
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__slider-title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
