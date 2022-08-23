import { format } from "date-fns";
import { toast } from "react-toastify";

import rainy from "../assets/img/rainy.png";
import sleet from "../assets/img/sleet.png";
import snow from "../assets/img/snow.png";
import sunny from "../assets/img/sunny.png";
import hail from "../assets/img/hail.png";

export const windDirection = {
  N: { value: "North", icon: "bi bi-arrow-up-circle-fill" },
  S: { value: "South", icon: "bi bi-arrow-down-circle-fill" },
  E: { value: "East", icon: "bi bi-arrow-right-circle-fill" },
  W: { value: "West", icon: "bi bi-arrow-left-circle-fill" },
  NE: { value: "North East", icon: "bi bi-arrow-up-right-circle-fill" },
  SE: { value: "South East", icon: "bi bi-arrow-down-right-circle-fill" },
  NW: { value: "North West", icon: "bi bi-arrow-up-left-circle-fill" },
  SW: { value: "South West", icon: "bi bi-arrow-down-left-circle-fill" },
};

export const precipitation = (precipitation) => {
  if (precipitation.sleet) {
    return sleet;
  } else if (precipitation.rain && precipitation.snow) {
    return sleet;
  } else if (precipitation.snow) {
    return snow;
  } else if (precipitation.hail) {
    return hail;
  } else if (precipitation.rain) {
    return rainy;
  } else {
    return sunny;
  }
};

export const statusColors = {
  waiting: "yellowColor",
  deployed: "blueColor",
  launched: "greenColor",
  cancelled: "redColor",
};

export const rocketStatus = {
  waiting: "waiting",
  deployed: "deployed",
  launched: "launched",
  cancelled: "cancelled",
  failed: "failed",
};

export const dateformat = (date, frm = "dd/MM/yyyy H:mm") => {
  if (!date) return "";
  return format(date, frm);
};

export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const Toast = (type, message) => {
  console.log(type, message);
  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "warning":
      return toast.warn(message);
    case "info":
      return toast.info(message);
    default:
      return toast.info(message);
  }
};

export const chunkedDataToJSonObject = (response) => {
  let promise = new Promise(function (resolve, reject) {
    let rocket;

    response.body
      .getReader()
      .read()
      .then(({ done, value }) => {
        const decoder = new TextDecoder();
        const chunk = decoder.decode(value);
        //rocketData = JSON.parse(chunk);
        //console.log("rocket data is", rocketData);
        rocket = JSON.parse(chunk);
        console.log("getted rocket,", rocket);
        resolve(rocket);
      })
      .catch((err) => {
        reject({});
      });
  });

  return promise;

  // console.log("returning>", rocket);
  //return rocket;
};
const header = {
  "Content-Type": "application/json",
  "x-api-key": "API_KEY_1",
};

export const getPutOptions = {
  method: "PUT",
  headers: header,
};

export const getDeleteOptions = {
  method: "DELETE",
  headers: header,
};

export const getGetOptions = {
  method: "GET",
  headers: header,
};
