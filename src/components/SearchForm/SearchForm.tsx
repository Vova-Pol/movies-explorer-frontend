import React, { FC, FormEvent } from 'react';
import './SearchForm.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {
  MOVIES_PAGE_URL,
  EMPTY_SEARCH_INPUT_ERROR_TEXT,
  LAST_SEARCH_DATA_LS_KEY,
} from '../../utils/constants';
import { ISearchFormValues } from '../../types/search';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ISearchFormProps {
  onHandleSubmit: (values: ISearchFormValues) => void;
  onHandleCheckbox: () => void;
  isChecked: boolean;
}

const SearchForm: FC<ISearchFormProps> = ({
  isChecked,
  onHandleCheckbox,
  onHandleSubmit,
}) => {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({ search: '' });

  const { isPresentInLs, getFromLs } = useLocalStorage();

  const [errText, setErrText] = useState('');
  const isSearchPage = useLocation().pathname === MOVIES_PAGE_URL;

  useEffect(() => {
    if (isSearchPage && isPresentInLs(LAST_SEARCH_DATA_LS_KEY)) {
      setValues({ search: getFromLs(LAST_SEARCH_DATA_LS_KEY).searchInput });
    }
  }, []);

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (values.search === '') {
      setErrText(EMPTY_SEARCH_INPUT_ERROR_TEXT);
      return;
    } else {
      setErrText('');
      onHandleSubmit(values);
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
        <FilterCheckbox onChange={onHandleCheckbox} isChecked={isChecked} />
      </form>
      <div className="search-form__line"></div>
    </section>
  );
};

export default SearchForm;
