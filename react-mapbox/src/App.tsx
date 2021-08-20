import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Mapbox from "./Mapbox";

function App() {
  const mapRef = useRef()
  const [fieldData, setFieldData] = useState<any>();
  const handleSubmit = () => {
    // let geoJSON;
    // const oldJSONData = localStorage.getItem("fields");
    // console.log(oldJSONData, fieldData, "ole")
    // if (oldJSONData) {
    //   const oldFieldData = JSON.parse(oldJSONData);
    //   geoJSON = JSON.stringify([...oldFieldData, ...fieldData]);
    // } else geoJSON = JSON.stringify(fieldData);
    // localStorage.setItem("fields", geoJSON);
    (mapRef.current as any).saveData()
  };

  return (
    <div className="App">
      <div className="App-header">
        <button onClick={handleSubmit}>Submit</button>
        <Mapbox ref={mapRef}/>
      </div>
    </div>
  );
}

export default App;
