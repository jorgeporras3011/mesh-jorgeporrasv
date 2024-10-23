import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CURRENCY } from "../../utils/constants";

const STORAGE_CURRENCY = "currencySelected";
const getStorage = localStorage.getItem(STORAGE_CURRENCY);

export const SelectedCurrency = createSlice({
  name: "selectedCurrency",
  initialState: getStorage !== null ? JSON.parse(getStorage) : DEFAULT_CURRENCY,
  reducers: {
    updateCurrency: (state, action) => {
      state = action.payload;
      localStorage.setItem(STORAGE_CURRENCY, JSON.stringify(action.payload));
      return state;
    },
  },
});

export const getCurrency = (state: any) => state.selectedCurrency;
export const { updateCurrency } = SelectedCurrency.actions;
export default SelectedCurrency.reducer;
