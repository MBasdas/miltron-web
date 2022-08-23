import React, { useState, useCallback } from "react";
import { useStream } from "react-fetch-streams";
import "../assets/weather.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/Rockets.css";

import {
  windDirection,
  precipitation,
  dateformat,
  nFormatter,
} from "../utils/Utils";
import { Puff } from "react-loader-spinner";

const Weather = () => {
  const fetchParams = {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY_1",
    },
  };
  const [data, setData] = useState();
  const onNext = useCallback(
    async (res) => {
      const data = await res.json();
      setData(data);
    },
    [setData]
  );

  useStream("http://localhost:5000/weather", { onNext, fetchParams });

  return (
    <>
      <div className="weather">
        {data?.precipitation === undefined && (
          <div className="loading">
            <Puff color="#00BFFF" height="24" width="24" />
          </div>
        )}
        {data?.precipitation && (
          <div>
            <img src={precipitation(data.precipitation)} alt="Weather" />
          </div>
        )}
        <div className="col time">
          {data?.precipitation &&
            nFormatter(data.precipitation.probability * 100, 0) + " %"}
        </div>
        <div className="col time">
          {data?.time && dateformat(new Date(data.time), "H:mm:ss")}
        </div>

        <div className="col">
          {data?.temperature &&
            data.temperature.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) + "°C"}
        </div>
        <div className="col">
          {
            data?.humidity && (
              <i className="bi bi-droplet-fill">
                %
                {(data.humidity * 100).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </i>
            )

            //data.humidity.toLocaleString(undefined, {
            //maximumFractionDigits: 2,
            //})}
          }
        </div>
        <div className="col">
          {data?.wind && (
            <i className={windDirection[data.wind["direction"]].icon}>
              {data.wind["angle"].toLocaleString(undefined, {
                maximumFractionDigits: 0,
              }) +
                "° " +
                data.wind["speed"].toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                }) +
                "m/s"}
            </i>
          )}
        </div>
        <div className="col">
          {data?.pressure &&
            data.pressure.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) + " hPa"}
        </div>
      </div>
    </>
  );
};

export default Weather;
