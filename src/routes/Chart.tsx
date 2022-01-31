import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
  theme:string;
}

function Chart({ coinId,theme }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  console.log(data?.map((price) => price.close));
  console.log(
    data?.map((info) => ({
      x: info.time_close,
      y: [info.open, info.high, info.low, info.close],
    }))
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((info) => ({
                x: info.time_close,
                y: [info.open, info.high, info.low, info.close],
              })),
            },
          ]}
          options={{
            theme: { mode:  theme === "light" ? "light" : "dark"},
            chart: {
              width: 500,
              height: 300,
              toolbar: { show: false },
              background: "none",
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#FF0033",
                  downward: "#3399FF",
                },
              },
            },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(5)}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
