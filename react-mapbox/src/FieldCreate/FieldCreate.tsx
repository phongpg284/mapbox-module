import "./style.css";
import Mapbox from "../Mapbox";
import { Button, Form, Input } from "antd";
import { useRef } from "react";
import { drawStyles } from "./MapboxStyle";
import { displayStyles } from "./MapboxConfig";
import * as turf from "@turf/turf";
import { useHistory } from "react-router-dom";

const FieldCreate = () => {
  const mapRef = useRef();
  const history = useHistory();

  // Get data from localstorage
  // const fieldData = localStorage.getItem("fields");
  // let JSONData = "";
  // if (fieldData) JSONData = JSON.parse(fieldData);
  // console.log(JSONData);

  const handleSubmit = (value: any) => {
    // TODO: CALL API SAVE TO DB
    // TODO: REDIRECT BACK TO MAIN
    console.log(value);
    // get draw geoJson data
    const drawData = (mapRef.current as any).getDrawData();
    const areaField = Math.round(turf.area(drawData) * 100) / 100;
    
    const centerField = turf.center(drawData);
    console.log(centerField, "ehe");

    const bbox = turf.bbox(drawData);
    console.log(bbox, "bbox");

    const createDate = new Date()

    // // update to local storage
    // let updateGeoJSONData;
    // const oldData = localStorage.getItem(value.fieldName);
    // if (oldData) {
    //   updateGeoJSONData = {
    //     type: "FeatureCollection",
    //     features: [...JSON.parse(oldData).features, ...drawData.features],
    //   };
    // } else updateGeoJSONData = drawData;
    // localStorage.setItem(value.fieldName, JSON.stringify(updateGeoJSONData));

    //save to localstorage
    const saveData = {
      name: value.fieldName,
      area: areaField,
      data: drawData,
      createdAt: createDate
    };
    localStorage.setItem(value.fieldName, JSON.stringify(saveData));

    //update fake db on local storage
    const oldFakeData = localStorage.getItem("fakeDB");
    let updateFakeData;
    if (oldFakeData) {
      updateFakeData = JSON.parse(oldFakeData).concat(value.fieldName);
    } else updateFakeData = [value.fieldName];
    localStorage.setItem("fakeDB", JSON.stringify(updateFakeData));

    history.push("/");
  };
  return (
    <div className="wrapper">
      <div className="content">
        <div className="title fw-bold fs-3 mb-4">
          <div>Create Field on the Map</div>
        </div>
        <div className="create-form">
          <Form onFinish={handleSubmit} layout="inline">
            <div className="create-input">
              <Form.Item name="fieldName">
                <Input placeholder="Field name" size="large" required></Input>
              </Form.Item>
            </div>
            <div className="submit-buttons">
              <Button type="default" size="large" onClick={()=> history.push("/")}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                // onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox
          ref={mapRef}
          // data={JSONData}
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
