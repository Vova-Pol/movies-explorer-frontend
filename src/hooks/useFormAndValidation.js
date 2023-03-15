import React from 'react';

export function useFormAndValidation(initialInputValues) {
  const [values, setValues] = React.useState(initialInputValues);
  const [errors, setErrors] = React.useState(initialInputValues);
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const resetForm = () => {
    setValues(initialInputValues);
    setErrors(initialInputValues);
    setIsValid(true);
  };

  return { values, handleChange, setValues, errors, isValid, resetForm };
}
