import { useEffect, useState } from "react";
import { Layer, Source } from "react-mapbox-gl";
import { getTrackingData } from "./getTrackingData";

interface ITrackingDrawWrapperProps {
    endpoint: string;
}

const TrackingDrawWrapper: React.FC<ITrackingDrawWrapperProps> = ({ endpoint }) => {
  const [trackingData, setTrackingData] = useState({
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  });

  useEffect(() => {
    console.log("start")
    if(endpoint)
    getTrackingData(0, endpoint, setTrackingData,3)
  },[endpoint])

  return (
    <div>
      <Source id="deviceHehe" geoJsonSource={trackingData} />
      <Layer type="line" id="deviceHehe" sourceId="deviceHehe" />
    </div>
  );
};

export default TrackingDrawWrapper;
