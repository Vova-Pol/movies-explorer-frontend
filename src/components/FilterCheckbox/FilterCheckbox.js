import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="search-form__checkbox-container">
      <label className="search-form__filter-checkbox">
        <input className="search-form__switch-input" type="checkbox"></input>
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__slider-title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
