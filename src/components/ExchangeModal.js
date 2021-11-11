import React from "react";
import Select from "react-select";
import CurrencyInput from "./CurrencyInput";

import Logo from "../assets/logo.png";
import "./index.scss";
const ExchangeModal = () => {
  const options = [
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "USD", label: "USD" },
  ];

  return (
    <div className="modal-container">
      <div className="modal-header">
        <img className="Logo" src={Logo} alt="React logo" />
        <p className="ToDo-Header">Currency Exchange</p>
      </div>
      <div className="convert-wrapper">
        <div className="reduce-part">
          <div className="currency-wrapper">
            <div className="currency-select">
              <Select options={options} />
            </div>
            <div className="balance-wrapper">
              <span>Balance :</span>
            </div>
          </div>
          <div className="currency-amount">
            <span className="symbol">-</span>
            <CurrencyInput placeholder="$ 0.00" type="text" />
          </div>
        </div>
        <div className="conversion-part">
          <div className="convert-modal">hello</div>
        </div>
        <div className="increase-part">
          <div className="currency-wrapper">
            <div className="currency-select">
              <Select options={options} />
            </div>
            <div className="balance-wrapper">
              <span>Balance :</span>
            </div>
          </div>
          <div className="currency-amount">
            <span className="symbol">+</span>
            <CurrencyInput placeholder="$ 0.00" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExchangeModal;
