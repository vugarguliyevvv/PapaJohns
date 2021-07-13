import { useState } from "react";

import useInput from "../../hooks/use-input";

const phoneNumberPattern = /[0-9]/;

function isNotEmpty(value) {
  return value.trim() !== "";
}

function hasFiveCharacters(value) {
  return value.trim().length > 4;
}

function Checkout({ onCancel, onSubmitOrder }) {
  const {
    inputValue: enteredName,
    valueIsValid: enteredNameIsValid,
    inputHasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    inputValue: enteredAddress,
    valueIsValid: enteredAddressIsValid,
    inputHasError: addressInputHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(hasFiveCharacters);

  const [phoneCode, setPhoneCode] = useState("050");
  const [phoneNumber, setPhoneNumber] = useState("");

  function phoneCodeHandler(e) {
    switch (e.target.value) {
      case "050":
      case "051":
      case "055":
      case "070":
      case "077":
        setPhoneCode(e.target.value);
        break;
      default:
        setPhoneCode("invalid");
    }
  }

  function phoneChangeHandler(e) {
    if (e.target.value.length > 7 || e.target.value[0] === "0") return;

    if (
      phoneNumberPattern.test(e.target.value.slice(-1)) ||
      e.target.value === ""
    ) {
      setPhoneNumber(e.target.value);
    }
  }

  let phoneCodeIsValid = phoneCode !== "invalid";
  let phoneNumberIsValid = phoneNumber.length === 7;

  let formIsValid = false;

  if (
    phoneNumberIsValid &&
    phoneCodeIsValid &&
    enteredNameIsValid &&
    enteredAddressIsValid
  )
    formIsValid = true;

  function confirmHandler(e) {
    e.preventDefault();

    if (formIsValid) {
      onSubmitOrder({
        fullname: enteredName,
        address: enteredAddress,
        phone: phoneCode + phoneNumber,
      });
    }
  }

  return (
    <form onSubmit={confirmHandler} className="checkout-form">
      <div className="control">
        <label htmlFor="name">Ad Soyad</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <span className="input-message">Boş buraxmayın</span>
        )}
      </div>
      <div className="control">
        <label htmlFor="address">Ünvan</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressChangedHandler}
          onBlur={addressBlurHandler}
        />
        {addressInputHasError && (
          <span className="input-message">Boş buraxmayın</span>
        )}
      </div>
      <div className="control">
        <label htmlFor="phone">Əlaqə Nömrəsi</label>
        <select
          className="phone-code"
          name="phone"
          defaultValue={phoneCode}
          onChange={phoneCodeHandler}
        >
          <option value="050">050</option>
          <option value="051">051</option>
          <option value="055">055</option>
          <option value="070">070</option>
          <option value="077">077</option>
        </select>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={phoneChangeHandler}
        />
      </div>
      <div className="cart-actions">
        <button type="button" onClick={onCancel} className="cart-close">
          Ləğv Et
        </button>
        <button className="cart-order" disabled={!formIsValid}>
          Təsdiqlə
        </button>
      </div>
    </form>
  );
}

export default Checkout;
