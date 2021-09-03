import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import Mapbox from "../Mapbox";
import Option1 from "./Option1.json";
import Option2 from "./Option2.json";
import Option3 from "./Option3.json";

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN_ACCESS;

const TrackingMap = ({ data }: any) => {
    const [selectMap, setSelectMap] = useState<string>("0");
    const mapData = [Option1, Option2, Option3]
  return (
    <div className="wrapper">
      <div className="content">
        <div className="title fw-bold fs-3 mb-4 d-flex">
          <div>Tracking Map</div>
          <div className="ms-5">
            <Select defaultValue="9/3 track" onChange={(value: string) => setSelectMap(value)}>
              <Option value="0">9/3 track</Option>
              <Option value="1">IMET</Option>
              <Option value="2">Test RTK</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox
          //   ref={mapRef}
          accessToken={accessToken}
          data={mapData[Number(selectMap)]}
          //   drawStyles={drawStyles}
          //   displayStyles={displayStyles}
          center={mapData[Number(selectMap)].features[0].geometry.coordinates[0]}
          zoom={23}
          maxWidth="100%"
          height="calc(100vh - 175px)"
        />
      </div>
    </div>
  );
};

export default TrackingMap;
