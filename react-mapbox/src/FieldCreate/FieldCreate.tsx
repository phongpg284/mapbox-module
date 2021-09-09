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
  const accessToken =
    "pk.eyJ1IjoidHB3Mjg0IiwiYSI6ImNrc2VrYnk0bjExaWIybnJveGFtOGV0eDAifQ.pSJ4eAaCbdrjhzmqXMRK_A";

  // Get data from localstorage
  // const fieldData = localStorage.getItem("fields");
  // let JSONData = "";
  // if (fieldData) JSONData = JSON.parse(fieldData);
  // console.log(JSONData);

  const handleSubmit = (value: any) => {
    // TODO: CALL API SAVE TO DB
    // TODO: REDIRECT BACK TO MAIN

    // get draw geoJson data
    const drawData = (mapRef.current as any).getDrawData();

    const areaField = Math.round(turf.area(drawData) * 100) / 100;
    const createDate = new Date();

    const style = {
      Name: "fdfd",
      fill: "#00A26A",
      "fill-opacity": 0.9,
      stroke: "#de3529",
      "stroke-width": 1,
    };

    const newDrawData = {
      ...drawData,
      features: [
        {
          ...drawData.features[0],
          properties: style,
        },
      ],
    };

    const drawUrl = encodeURIComponent(JSON.stringify(newDrawData));
    const imgField = `https://api.mapbox.com/v4/mapbox.satellite/geojson(${drawUrl})/auto/200x200.jpg?access_token=${accessToken}`;

    //save to localstorage
    const saveData = {
      name: value.fieldName,
      area: areaField,
      bounding: drawData,
      createdAt: createDate,
      img: imgField,
    };
    // localStorage.setItem(value.fieldName, JSON.stringify(saveData));

    fetch(process.env.REACT_APP_API_URL!, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(saveData), // body data type must match "Content-Type" header
    })
      .then((data) => {
        // console.log(data)
        history.push("/field/list");
      })
      .catch((err) => console.log(err));

    //update fake db on local storage
    // const oldFakeData = localStorage.getItem("fakeDB");
    // let updateFakeData;
    // if (oldFakeData) {
    //   updateFakeData = JSON.parse(oldFakeData).concat(value.fieldName);
    // } else updateFakeData = [value.fieldName];
    // localStorage.setItem("fakeDB", JSON.stringify(updateFakeData));

    // history.push("/list");
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
              <Button
                type="default"
                size="large"
                onClick={() => history.push("/list")}
              >
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
          accessToken={accessToken}
          // data={JSONData}
          drawStyles={drawStyles}
          displayStyles={displayStyles}
          maxWidth="100%"
          height="calc(100vh - 220px)"
        />
      </div>
    </div>
  );
};

export default FieldCreate;
