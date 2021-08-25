import "./style.css";
import Mapbox from "../Mapbox";
import { Button, Input } from "antd";
import { useRef } from "react";
import { drawStyles } from "./MapboxStyle";
import { displayStyles } from "./MapboxConfig";

const FieldCreate = () => {
  const mapRef = useRef();

  // Get data from localstorage
  const fieldData = localStorage.getItem("fields");
  let JSONData = "";
  if (fieldData) JSONData = JSON.parse(fieldData);

  console.log(JSONData);
  const handleSubmit = () => {
    // TODO: call api save to DB
    // TODO: redirect back to main page

    // draw geoJson data
    const drawData = (mapRef.current as any).getDrawData();

    //save to local storage
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
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Create Field on the Map</h1>
        </div>
        <div className="create-form">
          <div className="create-input">
            <Input placeholder="Field name" size="large"></Input>
          </div>
          <div className="submit-buttons">
            <Button type="default" size="large">
              Cancel
            </Button>
            <Button type="primary" size="large" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox
          ref={mapRef}
          data={JSONData}
          drawStyles={drawStyles}
          displayStyles={displayStyles}
          maxWidth="100%"
          height="calc(100vh - 148px)"
        />
      </div>
    </div>
  );
};

export default FieldCreate;
