import SideBar from "../components/SideBar";
import Rocket from "../components/Rocket";
import React, { useState, useCallback, useEffect } from "react";
import { useStream } from "react-fetch-streams";
import "../assets/Rockets.css";
import Weather from "../components/Weather";
import { Puff } from "react-loader-spinner";

const Rockets = () => {
  const [isError, setIsError] = useState(false);

  const fetchParams = {
    //method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY_1",
    },
  };

  const [data, setData] = useState([]);
  const onNext = useCallback(
    async (res) => {
      //setIsError(false);
      const data = await res.json();
      setData(data);
    },
    [setData]
  );

  const onError = (e) => {
    console.log("on error> ", e);
    setIsError(true);
  };

  const onDone = () => {
    console.log("{onDone}>");
  };

  useStream("http://localhost:5000/rockets", {
    onNext,
    onError,
    onDone,
    fetchParams,
  });

  return (
    <>
      <div className="row ">
        <div className="col">
          <SideBar />
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-2">
          <Weather />
        </div>
        <div className="col-10 d-flex flex-wrap rocketcontent">
          {data?.length > 0 ? (
            data.map((rocket) => {
              return (
                <div className="col-10 col-sm-10 col-md-10 col-lg-5">
                  <Rocket rocket={rocket} />
                </div>
              );
            })
          ) : (
            <div className="loading justify-content-center">
              <Puff color="#00BFFF" height="24" width="24" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Rockets;
