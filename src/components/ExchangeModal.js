import axios from "axios";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import CurrencyInput from "./CurrencyInput";
import { convertRateMock } from "../utils/mockData";
import Logo from "../assets/logo.png";
import "./index.scss";
const ExchangeModal = () => {
  const options = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
  ];

  const [reduceWallet, setReduceWallet] = useState(options[0]);
  const [increaseWallet, setIncreaseWallet] = useState(options[1]);
  const [convertRate, setConvertRate] = useState(convertRateMock);
  const [increaseAmount, setIncreaseAmount] = useState();
  const [reduceAmount, setReduceAmount] = useState();
  const [increaseError, setIncreaseError] = useState(false);
  const [reduceError, setReduceError] = useState(false);

  const [currencyBalance, setCurrencyBalance] = useState({
    USD: 200,
    EUR: 150,
    GBP: 10,
  });

  const currencySymbol = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const currencyConvert = {
    USD: 1,
    EUR: convertRate["EUR"],
    GBP: convertRate["GBP"],
  };

  async function fetchConvertRate() {
    await axios({
      url: "https://freecurrencyapi.net/api/v2/latest?apikey=98af3480-426a-11ec-a903-2fddc33818b2",
      method: "GET",
    }).then((res) => {
      setConvertRate(res.data.data);
    });
  }
  useEffect(() => {
    fetchConvertRate();
  }, []);

  useEffect(() => {
    if (reduceAmount) {
      console.log(
        "rate ----> ",
        currencyConvert[reduceWallet.value] /
          currencyConvert[increaseWallet.value]
      );
      setIncreaseAmount(
        (Number(reduceAmount.slice(1)) *
          currencyConvert[increaseWallet.value]) /
          currencyConvert[reduceWallet.value]
      );
    }
  }, [reduceWallet, increaseWallet]);

  const handleConvertCurrency = () => {
    const reduceWalletCurrency = reduceWallet.value;
    const increaseWalletCurrency = increaseWallet.value;

    // currencyBalance[reduceWalletCurrency] =
    //   currencyBalance[reduceWalletCurrency] -
    //   (isNaN(reduceAmount) ? Number(reduceAmount.slice(1)) : reduceAmount);
    let calculatedReduceCurrency =
      currencyBalance[reduceWalletCurrency] -
      (isNaN(reduceAmount) ? Number(reduceAmount.slice(1)) : reduceAmount);

    let calculatedIncreaseCurrency =
      currencyBalance[increaseWalletCurrency] +
      (isNaN(increaseAmount)
        ? Number(increaseAmount.slice(1))
        : increaseAmount);

    if (calculatedReduceCurrency < 0) {
      setReduceError(true);
      return;
    } else {
      currencyBalance[reduceWalletCurrency] = calculatedReduceCurrency;
    }
    if (calculatedIncreaseCurrency < 0) {
      setIncreaseError(true);
      return;
    } else {
      currencyBalance[increaseWalletCurrency] = calculatedIncreaseCurrency;
    }
    setIncreaseError(false);
    setReduceError(false);
    setIncreaseAmount(0);
    setReduceAmount(0);

    setCurrencyBalance({
      ...currencyBalance,
    });
  };
  return (
    <div className="modal-container">
      <div className="modal-header">
        <img className="Logo" src={Logo} alt="React logo" />
        <p className="ToDo-Header">Currency Exchange</p>
      </div>
      <div className="convert-wrapper">
        <div className="conversion-part">
          <div className="convert-modal">
            {`${currencySymbol[reduceWallet.value]} 1.00 = ${
              currencySymbol[increaseWallet.value]
            } ${(
              currencyConvert[increaseWallet.value] /
              currencyConvert[reduceWallet.value]
            ).toFixed(2)}`}
          </div>
        </div>
        <div className="reduce-part">
          <div className="currency-wrapper">
            <div className="currency-select">
              <Select
                value={reduceWallet}
                options={options}
                onChange={setReduceWallet}
              />
            </div>
            <div className="balance-wrapper">
              <span>
                Balance : {currencySymbol[reduceWallet.value]}{" "}
                {currencyBalance[reduceWallet.value]}
              </span>
            </div>
          </div>
          {reduceError && (
            <span style={{ color: "red", right: "30px", position: "absolute" }}>
              Exceeds Balance
            </span>
          )}
          <div className="currency-amount">
            <span className="symbol">-</span>

            <CurrencyInput
              placeholder={`${currencySymbol[reduceWallet.value]} 0.00`}
              type="text"
              prefix={currencySymbol[reduceWallet.value]}
              onChange={(e) => {
                setReduceAmount(e.target.value);
                setIncreaseAmount(
                  Number(
                    (e.target.value.slice(1) *
                      currencyConvert[increaseWallet.value]) /
                      currencyConvert[reduceWallet.value]
                  )
                );
              }}
              value={reduceAmount}
            />
          </div>
        </div>
        <div className="increase-part">
          <div className="increase-wrapper">
            <div className="currency-wrapper">
              <div className="currency-select">
                <Select
                  value={increaseWallet}
                  options={options}
                  onChange={setIncreaseWallet}
                />
              </div>
              <div className="balance-wrapper">
                <span>
                  Balance : {currencySymbol[increaseWallet.value]}{" "}
                  {currencyBalance[increaseWallet.value]}
                </span>
              </div>
            </div>
            {increaseError && (
              <span
                style={{ color: "red", right: "30px", position: "absolute" }}
              >
                Exceeds Balance
              </span>
            )}
            <div className="currency-amount">
              <span className="symbol">+</span>
              <CurrencyInput
                placeholder={`${currencySymbol[increaseWallet.value]} 0.00`}
                type="text"
                prefix={currencySymbol[increaseWallet.value]}
                onChange={(e) => {
                  setIncreaseAmount(e.target.value);
                  setReduceAmount(
                    Number(
                      (e.target.value.slice(1) *
                        currencyConvert[reduceWallet.value]) /
                        currencyConvert[increaseWallet.value]
                    )
                  );
                }}
                value={increaseAmount}
              />
            </div>
          </div>
          <div className="submit-button">
            <button onClick={handleConvertCurrency}>Exchange</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExchangeModal;
