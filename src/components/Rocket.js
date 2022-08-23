import "../assets/rocket.css";
import "../assets/common.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RocketImage from "../assets/img/rocket.png";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Telemetry from "./Telemetry";
import { Puff } from "react-loader-spinner";
import {
  nFormatter,
  Toast,
  chunkedDataToJSonObject,
  statusColors,
  rocketStatus,
  dateformat,
  getPutOptions,
  getDeleteOptions,
} from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rocket = ({ rocket }) => {
  const [loading, setLoading] = useState(false);
  const [rocketData, setRocketData] = useState(rocket);

  useEffect(() => {
    console.log("gerçek rocket data", rocketData);
  }, [rocketData]);

  const setRocketStatus = (id, status, opt) => {
    setLoading(true);

    fetch(
      "http://localhost:5000/rocket/" + id + "/status/" + status,
      opt == rocketStatus.cancelled ? getDeleteOptions : getPutOptions
    )
      .then((response) => {
        setLoading(false);
        chunkedDataToJSonObject(response)
          .then((data) => {
            setRocketData(data);
          })
          .catch((data) => {
            setRocketData(data);
          });
        Toast("success", "Rocket is " + status);
      })
      .catch((err) => {
        setLoading(false);
        Toast("error", "An error occured. Please try again.");
      });
  };

  return (
    <>
      {rocketData && (
        <div className="col-12 rocket ">
          <div className="title">{rocketData.model}</div>
          <div className="d-flex justify-content-center">
            <img className="rocketimage" src={RocketImage} alt="Rocket" />
          </div>

          <div>
            {
              <div className="buttonGroup justify-content-center">
                {(rocketData.status === rocketStatus.waiting ||
                  rocketData.status == rocketStatus.cancelled ||
                  rocketData.status === rocketStatus.failed) && (
                  <Button
                    variant="primary"
                    disabled={loading}
                    onClick={() => {
                      setRocketStatus(rocketData.id, rocketStatus.deployed);
                    }}
                  >
                    {loading ? (
                      <Puff color="#00BFFF" height="24" width="24" />
                    ) : (
                      "Deploy"
                    )}
                  </Button>
                )}

                {rocketData.status === rocketStatus.deployed && (
                  <Button
                    variant="primary"
                    disabled={loading}
                    show={rocketData.status === rocketStatus.deployed}
                    onClick={() =>
                      setRocketStatus(rocketData.id, rocketStatus.launched)
                    }
                  >
                    {loading ? (
                      <Puff color="#fff" height="24" width="24" />
                    ) : (
                      "Launch"
                    )}
                  </Button>
                )}

                {rocketData.status === rocketStatus.launched && (
                  <Button
                    variant="danger"
                    disabled={loading}
                    onClick={() =>
                      setRocketStatus(
                        rocketData.id,
                        rocketData.status,
                        rocketStatus.cancelled
                      )
                    }
                  >
                    {loading ? (
                      <Puff color="#fff" height="24" width="24" />
                    ) : (
                      <i class="bi bi-x-circle-fill"> Cancel Launch</i>
                    )}
                  </Button>
                )}
              </div>
            }

            {rocketData.payload && <div>{rocketData.payload.description}</div>}
            <div className="d-flex">
              <div className="box col-4">
                <div className="rowLine">
                  Mass: {rocketData.mass && nFormatter(rocketData.mass, 2)}
                </div>

                {rocketData.payload && (
                  <div className="rowLine">
                    Weight:{" "}
                    {rocketData.payload.weight &&
                      nFormatter(rocketData.payload.weight, 2)}
                  </div>
                )}
                <div className="rowLine">
                  Status:{" "}
                  <i
                    className={`bi bi-exclamation-circle-fill ${
                      statusColors[rocketData.status]
                    }`}
                  />{" "}
                  {rocketData.status}
                </div>
                <div className="rowLine">
                  Altitude:{" "}
                  {rocketData.altitude && nFormatter(rocketData.altitude, 2)}
                </div>

                <div className="rowLine">
                  Speed: {rocketData.speed && nFormatter(rocketData.speed, 2)}
                </div>
                <div className="rowLine">
                  Temperature:{" "}
                  {rocketData.temperature &&
                    nFormatter(rocketData.temperature, 2)}
                </div>
              </div>
              <div className="box col-8">
                {rocketData.timestamps && (
                  <div className="rowLine">
                    Launched:{" "}
                    {rocketData.timestamps.launched &&
                      dateformat(new Date(rocketData.timestamps.launched))}
                  </div>
                )}
                {rocketData.timestamps && (
                  <div className="rowLine">
                    Deployed:
                    {rocketData.timestamps.deployed &&
                      dateformat(new Date(rocketData.timestamps.deployed))}{" "}
                  </div>
                )}
                {rocketData.timestamps && (
                  <div className="rowLine">
                    Failed:{" "}
                    {rocketData.timestamps.failed &&
                      dateformat(new Date(rocketData.timestamps.failed))}
                  </div>
                )}

                {rocketData.timestamps && (
                  <div className="rowLine">
                    Cancelled:{" "}
                    {rocketData.timestamps.cancelled &&
                      dateformat(new Date(rocketData.timestamps.cancelled))}
                  </div>
                )}

                {
                  <div className="rowLine">
                    Acceleration:{" "}
                    {rocketData.acceleration &&
                      nFormatter(rocketData.acceleration, 2)}
                  </div>
                }

                <div className="rowLine">
                  Thrust:
                  {rocketData.thrust && nFormatter(rocketData.thrust, 2)}
                </div>
              </div>
            </div>
            {
              <div className="col-12">
                {rocketData.telemetry && (
                  <Telemetry port={rocketData.telemetry.port} />
                )}
              </div>
            }
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
          />
        </div>
      )}
    </>
  );
};

export default Rocket;
