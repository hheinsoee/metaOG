import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import { metaOG } from "../src/metaOg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const load = async () =>
    await metaOG("https://www.heinsoe.com").then((data) => {
      setData(data);
    });
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      Hello
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default App;
