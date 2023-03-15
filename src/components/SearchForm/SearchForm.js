import './SearchForm.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import getMoviesList from '../../utils/MoviesApi';
import { movies } from '../../utils/data';
import { useState } from 'react';

function SearchForm(props) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation('');

  const [errText, setErrText] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(values);
    if (!isValid || !values) {
      setErrText('Нужно ввести ключевое слово');
      return;
    } else {
      setErrText('');
      const moviesList = await getMoviesList();
      const filteredMoviesList = moviesList.filter(
        (movie) =>
          movie.nameEN.toLowerCase().includes(values.search) ||
          movie.nameRU.toLowerCase().includes(values.search),
      );
      props.onUpdateMoviesList(filteredMoviesList);
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
