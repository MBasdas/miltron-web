import React, { useState } from "react";
import SockJsClient from "react-stomp";
import "../assets/common.css";
import "../assets/telemetry.css";
import { nFormatter } from "../utils/Utils";

const Telemetry = ({ port }) => {
  const SOCKET_URL = "http://localhost:8080/ws-telemetry";
  const [telemetryData, setTelemetryData] = useState();

  const [isConnected, setIsConnected] = useState(false);

  let onConnected = () => {
    setIsConnected(true);
  };

  let onMessageReceived = (telemetryData) => {
    setTelemetryData(telemetryData);
    //console.log(telemetryData.rocketId);
  };

  const disconnected = () => {
    setIsConnected(false);
  };

  //console.log(port);
  return (
    <div className="col-12">
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/" + port]}
        onConnect={onConnected}
        onDisconnect={disconnected}
        onMessage={(telemetryData) => onMessageReceived(telemetryData)}
        debug={false}
      />
      <div className="title">Telemetry</div>
      <div className="d-flex">
        <div className="col-3">Connection</div>
        <div className="col-8">
          <i
            className="bi bi-ethernet"
            style={{ color: isConnected ? "green" : "red" }}
          ></i>
        </div>
      </div>
      {telemetryData && (
        <div className="d-flex">
          <div className="col-3">Altitude</div>
          <div className="col-8">: {nFormatter(telemetryData.altitude, 2)}</div>
        </div>
      )}
      {telemetryData && (
        <div className="d-flex">
          <div className="col-3">Speed</div>
          <div className="col-8">: {nFormatter(telemetryData.speed, 2)}</div>
        </div>
      )}
      {telemetryData && (
        <div className="d-flex">
          <div className="col-3">Acceleration</div>
          <div className="col-8">
            : {nFormatter(telemetryData.acceleration, 2)}
          </div>
        </div>
      )}
      {telemetryData && (
        <div className="d-flex">
          <div className="col-3">Thrust</div>
          <div className="col-8">: {nFormatter(telemetryData.thrust, 2)}</div>
        </div>
      )}
      {telemetryData && (
        <div className="d-flex">
          <div className="col-3">Temprature</div>
          <div className="col-8">
            : {nFormatter(telemetryData.temprature, 2)}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Telemetry;
