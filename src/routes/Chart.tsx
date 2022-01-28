import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { mapQueryStatusFilter } from "react-query/types/core/utils";

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
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  console.log(data?.map((price) => price.close));
  console.log(data?.map(function(date, ohlc){
    var list = {}
    list[date.time_close] = [date.open, date.low, date.high, date.close] ;

  }));
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ name: "Price", data: data?.map((price) => price.close) }]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#3C90EB',
                  downward: '#DF7D46'
                }
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
