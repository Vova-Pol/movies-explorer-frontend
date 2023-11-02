import React, { ChangeEvent } from 'react';

export function useFormAndValidation<T extends Object>(initialInputValues: T) {
  const [values, setValues] = React.useState<T>(initialInputValues);
  const [errors, setErrors] = React.useState(initialInputValues);
  const [isValid, setIsValid] = React.useState(true);
  const [isValuesChanged, setIsValuesChanged] = React.useState(
    JSON.stringify(initialInputValues) !== JSON.stringify(values),
  );

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form')!.checkValidity());
    setIsValuesChanged(
      JSON.stringify(initialInputValues) !==
        JSON.stringify({ ...values, [name]: value }),
    );
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
    setIsValuesChanged,
    isValuesChanged,
  };
}
