import React, { useEffect, useState } from "react";
import Context from "./Context";
import URL from "../Utils/url";

const State = (props) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${URL}/users`)
      .then((data) => data.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Context.Provider value={{ data, setData, search, setSearch }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
