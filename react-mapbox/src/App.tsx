import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Mapbox from "./Mapbox";

function App() {
  const mapRef = useRef()
  const [fieldData, setFieldData] = useState<any>();
  const handleSubmit = () => {
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
