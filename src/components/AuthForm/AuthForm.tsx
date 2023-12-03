import React, { FormEvent } from 'react';
import './AuthForm.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { IAuthFormConfig, IAuthFormValues } from '../../types/auth';

interface IAuthFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  formConfig: IAuthFormConfig;
  errorText: string;
}

export const AuthForm = <T extends IAuthFormValues>({
  initialValues,
  onSubmit,
  formConfig,
  errorText,
}: IAuthFormProps<T>) => {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation(initialValues);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onSubmit(values);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formConfig.fields.map((field) => (
        <React.Fragment key={field.inputName}>
          <label htmlFor={field.inputName} className="auth-form__label">
            {field.labelTitle}
          </label>
          <input
            id={field.inputName}
            type={field.inputType}
            name={field.inputName}
            className="auth-form__input"
            onChange={handleChange}
            value={values[field.inputName]}
            required
            minLength={field.minLength || 0}
            maxLength={field.maxLength || 100}
            pattern={field.pattern}
          ></input>
          <span className="auth-form__error-text">
            {isValid ? '' : errors[field.inputName]}
          </span>
        </React.Fragment>
      ))}

      <p className="auth-form__server-error-text">{errorText}</p>

      <button
        type="submit"
        className="auth-form__submit-btn"
        disabled={isValid ? false : true}
      >
        {formConfig.submitButtonText}
      </button>
    </form>
  );
};
