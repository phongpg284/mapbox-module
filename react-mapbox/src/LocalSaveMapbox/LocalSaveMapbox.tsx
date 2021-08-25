/* eslint-disable react/jsx-no-comment-textnodes */
import { useRef } from "react";
import Mapbox from "../Mapbox";
import { displayStyles } from "./MapboxConfig";
import { drawStyles } from "./MapboxStyle";

const LocalSaveMapbox = () => {
  const mapRef = useRef();
  const fieldData = localStorage.getItem("fields");
  let JSONData = "";
  if (fieldData) JSONData = JSON.parse(fieldData);

  console.log(JSONData)
  const handleSubmit = () => {
    const drawData = (mapRef.current as any).getDrawData();
    let updateGeoJSONData;
      const oldData = localStorage.getItem("fields");
      if (oldData) {
        updateGeoJSONData = {
          type: "FeatureCollection",
          features: [...JSON.parse(oldData).features, ...drawData.features],
        };
      } else updateGeoJSONData = drawData;
      localStorage.setItem("fields", JSON.stringify(updateGeoJSONData));
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>  
      <Mapbox drawStyles={drawStyles} displayStyles={displayStyles} ref={mapRef} data={JSONData}/>
    </div>
  );
};

export default LocalSaveMapbox;
