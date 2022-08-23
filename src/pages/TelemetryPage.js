import React, { useState, useEffect, useCallback } from "react";
import Telemetry from "../components/Telemetry";
import SideBar from "../components/SideBar";
import { useStream } from "react-fetch-streams";

const TelemetryPage = () => {
  const [telemetries, setTelemetries] = useState([]);
  useEffect(() => {
    const prev = telemetries;
    for (let i = 4000; i < 4010; i++) {
      prev.push(<Telemetry port={i} />);
    }
    setTelemetries(prev);
  }, []);

  const fetchParams = {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY_1",
    },
  };
  const [data, setData] = useState([]);
  const onNext = useCallback(
    async (res) => {
      const data = await res.json();
      setData(data);
    },
    [setData]
  );

  useStream("http://localhost:5000/weather", { onNext, fetchParams });

  return (
    <div className="row ">
      <div className="col">
        <SideBar />
      </div>
      <div>
        <div>
          {telemetries.map((telemetry) => {
            return <div> {telemetry}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default TelemetryPage;
