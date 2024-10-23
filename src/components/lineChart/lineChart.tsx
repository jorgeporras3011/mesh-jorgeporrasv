import "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getCurrency } from "../../redux/selectedCurrency/selectedCurrencySlice";
import { CRYPTO_CURRENCIES } from "../../utils/constants";

interface ILineChart {
  compareSymbol?: boolean;
}

interface DataAssets {
  label: string;
  data: string[];
  backgroundColor: string;
  borderColor: string;
}

export const LineChart = ({ compareSymbol = false }: ILineChart) => {
  const currency = useSelector(getCurrency);
  const defaultSearch = "Week";
  const month = "Month";
  const labelChart = `Final price by day ${currency.name}`;
  const searchDates = [defaultSearch, month];
  const [selectedDate, setSelectedDate] = useState(defaultSearch);
  const [days, setDays] = useState<string[]>([]);
  const [assets, setAssets] = useState<DataAssets[]>([]);
  const [selectedCompareCrypto, setSelectedCompareCrypto] = useState("");
  const formatDate = "YYYY-MM-DDT";
  const endDate = dayjs().format(`${formatDate}23:59:59`);
  const arrayCompareCryptos = CRYPTO_CURRENCIES.filter(
    (crypto) => crypto.symbol !== currency.symbol
  );
  const validation =
    days.length && compareSymbol ? assets.length === 2 : assets.length;

  const getStartDate = () => {
    switch (selectedDate) {
      case month:
        return dayjs().subtract(1, "M").format(`${formatDate}00:00:00`);

      default:
        return dayjs().subtract(6, "day").format(`${formatDate}00:00:00`);
    }
  };

  useEffect(() => {
    setDays([]);
    setAssets([]);
    const checkCompare =
      selectedCompareCrypto === currency.symbol
        ? arrayCompareCryptos[0].symbol
        : selectedCompareCrypto;
    const newAssets: DataAssets[] = [];
    fetch(
      `https://api.exchange.coinbase.com/products/${
        currency.symbol
      }-USD/candles?granularity=86400&start=${getStartDate()}&end=${endDate}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const orderDates = result;
        const mapDates = orderDates.map((times: number[]) =>
          dayjs.unix(times[0]).format("MMM-DD")
        );
        const mapFinalPrices = orderDates.map((times: string[]) =>
          parseFloat(times[4]).toFixed(2)
        );
        newAssets.push({
          label: labelChart,
          data: mapFinalPrices,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(25, 99, 132)",
        });
        setDays([...mapDates]);
        if (checkCompare) {
          fetch(
            `https://api.exchange.coinbase.com/products/${checkCompare}-USD/candles?granularity=86400&start=${getStartDate()}&end=${endDate}`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((result) => {
              const orderDates = result;
              const mapFinalPrices = orderDates.map((times: string[]) =>
                parseFloat(times[4]).toFixed(2)
              );
              const getNameSymbol = CRYPTO_CURRENCIES.filter(
                (curr) => curr.symbol === checkCompare
              );
              newAssets.push({
                label: `Final price by day ${getNameSymbol[0].name}`,
                data: mapFinalPrices,
                backgroundColor: "rgb(255, 99, 42)",
                borderColor: "rgb(255, 99, 42)",
              });
              setAssets([...newAssets]);
            })
            .catch((error) => console.error(error));
        } else {
          setAssets([...newAssets]);
        }
      })
      .catch((error) => console.error(error));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selectedDate, currency.symbol, selectedCompareCrypto]);

  return (
    <>
      SELECT A PERIOD: {currency.symbol}
      <select
        value={selectedDate}
        onChange={({ target: { value } }) => setSelectedDate(value)}
      >
        {searchDates.map((date) => {
          return (
            <option key={date} value={date}>
              {date}
            </option>
          );
        })}
      </select>
      {compareSymbol && (
        <>
          <br />
          SELECT A CRYPTO TO COMPARE:
          <select
            value={selectedCompareCrypto}
            onChange={({ target: { value } }) => {
              const getIndexCurrency = CRYPTO_CURRENCIES.findIndex(
                (crypto) => crypto.symbol === value
              );
              const getCurrencySelected = CRYPTO_CURRENCIES[getIndexCurrency];
              setSelectedCompareCrypto(getCurrencySelected.symbol);
            }}
          >
            <option disabled selected value="">
              {" "}
              -- select an option --{" "}
            </option>
            {arrayCompareCryptos.map((crypto) => {
              return (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.name}
                </option>
              );
            })}
          </select>
        </>
      )}
      {validation && (
        <Line
          data={{
            labels: days,
            datasets: assets,
          }}
        />
      )}
    </>
  );
};
