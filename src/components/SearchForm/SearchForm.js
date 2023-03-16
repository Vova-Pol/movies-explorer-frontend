import './SearchForm.css';
import { useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation('');

  const [errText, setErrText] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid || !values) {
      setErrText('Нужно ввести ключевое слово');
      return;
    } else {
      setErrText('');
      props.onHandleSubmit(values);
      resetForm();
      return;
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            type="text"
            name="search"
            className="search-form__input"
            placeholder="Фильм"
            required
            onChange={handleChange}
          ></input>
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
        <span className="search-form__input-error">{errText}</span>
        <FilterCheckbox />
      </form>
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
