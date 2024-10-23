import { configureStore } from "@reduxjs/toolkit";
import selectedCurrencySlice from "./selectedCurrency/selectedCurrencySlice";

export default configureStore({
  reducer: {
    selectedCurrency: selectedCurrencySlice,
  },
});
