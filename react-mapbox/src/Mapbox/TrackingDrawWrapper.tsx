import { memo, useEffect, useState } from "react";
import { Layer, Source } from "react-mapbox-gl";
import { getTrackingData } from "./getTrackingData";
interface ITrackingDrawWrapperProps {
  endpoint?: string;
  crops: any;
}

const TrackingDrawDevice = ({ endpoint, cropData, deviceId}: any) => {
  const paintStyles = (baseWidth: number) => {
    const baseZoom = 16;
    return {
      "line-color": "yellow",
      "line-opacity": 0.4,
      "line-width": {
        type: "exponential",
        base: 2,
        stops: [
          [0, baseWidth * Math.pow(2, 0 - baseZoom)],
          [24, baseWidth * Math.pow(2, 24 - baseZoom)],
        ],
      },
    };
  };

  const [trackingData, setTrackingData] = useState<any>({
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  });
  // useEffect(() => {
  //   return () => {
  //     setTrackingData({});
  //   };
  // }, []);

  useEffect(() => {
    console.log("start",deviceId);
    if (endpoint) getTrackingData(0, endpoint, setTrackingData, deviceId);
  }, [endpoint,deviceId]);
  return (
    <div>
      <Source id={`device${deviceId}`} geoJsonSource={trackingData} />
      <Layer
        type="line"
        id={`device${deviceId}`}
        sourceId={`device${deviceId}`}
        paint={paintStyles(cropData.properties.width)}
      />
    </div>
  );
};

const TrackingDrawWrapper: React.FC<ITrackingDrawWrapperProps> = ({
  endpoint,
  crops,
}) => {
  useEffect(()=> {
    console.log("track render")
  })
  return (
    <div>
      {crops &&
        crops.data.features.map((feature: any, index: number) => (
          <TrackingDrawDevice
            key={feature.properties.width}
            endpoint={endpoint}
            cropData={feature}
            deviceId={index}
          />
        ))}
    </div>
  );
};

export default TrackingDrawWrapper;
