import { useState, useCallback } from "react";
import { useStream } from "react-fetch-streams";

export const fetchStream = async ({ url, type = "get" }) => {
  const fetchParams = {
    method: type,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "API_KEY_1",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const [data, setData] = useState({});
  const onNext = useCallback(
    async (res) => {
      const data = await res.json();
      setData(data);
    },
    [setData]
  );
  useStream(url, { onNext, fetchParams });
  return data;
};
