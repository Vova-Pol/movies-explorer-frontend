import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className="search-form__checkbox-container">
      <label className="search-form__filter-checkbox">
        <input
          className="search-form__switch-input"
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        ></input>
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__slider-title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
