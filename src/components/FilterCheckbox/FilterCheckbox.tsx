import React from 'react';
import { FC } from 'react';
import './FilterCheckbox.css';

interface IFilterCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const FilterCheckbox: FC<IFilterCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <div className="search-form__checkbox-container">
      <label className="search-form__filter-checkbox">
        <input
          className="search-form__switch-input"
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        ></input>
        <span className="search-form__slider"></span>
      </label>
      <p className="search-form__slider-title">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
