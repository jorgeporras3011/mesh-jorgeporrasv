import { useDispatch, useSelector } from "react-redux";
import { CRYPTO_CURRENCIES } from "../../utils/constants";
import styles from "./toolbar.module.css";
import {
  getCurrency,
  updateCurrency,
} from "../../redux/selectedCurrency/selectedCurrencySlice";
import { useState } from "react";

export const Toolbar = () => {
  const dispatch = useDispatch();
  const currencySelected = useSelector(getCurrency);
  const [selectedCurrency, setSelectedCurrency] = useState(currencySelected);

  return (
    <div className={styles.toolbarContainer}>
      <span className={styles.toolbarTitle}>Crypto Assigment</span>
      <label>
        CURRENCY SELECTED:
        <select
          value={selectedCurrency.symbol}
          onChange={({ target: { value } }) => {
            const getIndexCurrency = CRYPTO_CURRENCIES.findIndex(
              (crypto) => crypto.symbol === value
            );
            const getCurrencySelected = CRYPTO_CURRENCIES[getIndexCurrency];
            setSelectedCurrency(getCurrencySelected);
            dispatch(updateCurrency(getCurrencySelected));
          }}
        >
          {CRYPTO_CURRENCIES.map((currency) => (
            <option key={currency.symbol} value={currency.symbol}>
              {currency.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
