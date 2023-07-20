import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [value, setValue] = useState({}); //Стейт Управления значения ввода в поле
  const [error, setError] = useState({}); //Стейт управления ошибкой
  const [isValid, setIsValid] = useState(false); //Cтейт управление кнопки валидности
  const [isInputValid, setIsInputValid] = useState({}); //Стейт управления красных подчеркиваний

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const validationMessage = event.target.validationMessage;
    const valid = event.target.validity.valid;
    const form = event.target.form;

    setValue((oldValue) => {
      return { ...oldValue, [name]: value };
    });

    setError((oldError) => {
      return { ...oldError, [name]: validationMessage };
    });

    setIsInputValid((oldIsInputValid) => {
      return { ...oldIsInputValid, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValue(data);
    setError({});
    setIsValid(false);
    setIsInputValid({});
  }

  const setValues = useCallback((name, value) => {
    setValue((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  }, []);

  return [value, error, isValid, isInputValid, handleChange, reset, setValues];
}
