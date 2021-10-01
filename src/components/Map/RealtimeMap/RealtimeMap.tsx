import { useState } from "react";
import Mapbox from "../Mapbox";
import { Select } from "antd";

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN_ACCESS;
const RealtimeMap = () => {
  const [data, setData] = useState<any>();
  const [selectMap, setSelectMap] = useState<string>("0");

  return (
    <div className="wrapper">
      <div className="content">
        <div className="title fw-bold fs-3 mb-4 d-flex">
          <div>Realtime Map</div>
          <div className="ms-5">
            <Select defaultValue="9/3 track" onChange={(value: string) => setSelectMap(value)}>
              <Select.Option value="0">9/3 track</Select.Option>
              <Select.Option value="1">IMET</Select.Option>
              <Select.Option value="2">Test RTK</Select.Option>
              <Select.Option value="3">test26t5</Select.Option>
              <Select.Option value="4">mandevices_plot</Select.Option>
              <Select.Option value="5">BK-test</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox
          //   ref={mapRef}
          url="http://localhost:4000/api/users"
          accessToken={accessToken}
          data={data?.bounding}
          dataTest={selectMap}
          //   drawStyles={drawStyles}
          //   displayStyles={displayStyles}
          center={data?.bounding.features[0].geometry.coordinates[0]}
          zoom={21}
          maxWidth="100%"
          height="calc(100vh - 175px)"
        />
      </div>
    </div>
  );
};

export default RealtimeMap;
