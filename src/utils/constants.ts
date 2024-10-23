interface CURRENCIES_ARRAY {
  name: string;
  symbol: string;
}

export const DEFAULT_CURRENCY: CURRENCIES_ARRAY = {
  name: "BITCOIN",
  symbol: "BTC",
};

export const CRYPTO_CURRENCIES: CURRENCIES_ARRAY[] = [
  DEFAULT_CURRENCY,
  {
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    name: "Solana",
    symbol: "SOL",
  },
  {
    name: "MAKER",
    symbol: "MKR",
  },
];
