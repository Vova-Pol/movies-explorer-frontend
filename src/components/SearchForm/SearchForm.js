import './SearchForm.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({ search: '' });

  const [errText, setErrText] = useState('');

  useEffect(() => {
    const lastSearch = localStorage.getItem('search-input-value');

    if (isSearchPage && lastSearch) {
      setValues({ search: lastSearch });
    }
  }, []);

  const isSearchPage = useLocation().pathname === '/movies';

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!values) {
      setErrText('Нужно ввести ключевое слово');
      return;
    } else {
      setErrText('');
      props.onHandleSubmit(values);
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
            value={values.search}
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
