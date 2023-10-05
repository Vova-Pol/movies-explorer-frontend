import React, { ChangeEvent } from 'react';

export function useFormAndValidation<T>(initialInputValues: T) {
  const [values, setValues] = React.useState(initialInputValues);
  const [errors, setErrors] = React.useState(initialInputValues);
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form')!.checkValidity());
  };

  const resetForm = () => {
    setValues(initialInputValues);
    setErrors(initialInputValues);
    setIsValid(true);
  };

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
  };
}
