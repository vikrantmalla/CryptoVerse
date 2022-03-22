import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { App } from "../../context/AppContext";
import { getSingleCoinHistoricalChart } from "../../services/cryptoApi";
import SelectButton from "./SelectButton";
import { chartDays } from "../data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
      padding: 0,
      paddingTop: 0,
    },
  },
}));


const LineChart = ({ cryptoDetails }) => {
  const { currency } = useContext(App);
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const classes = useStyles();
  useEffect(() => {
    getSingleCoinHistoricalChart(cryptoDetails.id, currency, days).then((data) => {
      setHistoricData(data?.prices)
    })
  }, [cryptoDetails.id, currency, days]);


  return (
    <div className={classes.container}>
      {!historicData ? (
        <CircularProgress
          style={{ color: "gold" }}
          size={150}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#126bff",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LineChart