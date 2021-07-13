import { useState } from "react";

const useInput = (validateValue) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputValue);
  const inputHasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    inputValue,
    valueIsValid,
    inputHasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
