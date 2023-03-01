import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__input-container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
          ></input>
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
        <FilterCheckbox />
      </form>
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
