import { useEffect, useState } from "react";
import { Layer, Source } from "react-mapbox-gl";
import { getTrackingData } from "./getTrackingData";
interface ITrackingDrawWrapperProps {
  endpoint?: string;
  crops: any;
}

const TrackingDrawWrapper: React.FC<ITrackingDrawWrapperProps> = ({
  endpoint,
  crops,
}) => {
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

  useEffect(() => {
    return () => {
      setTrackingData({});
    };
  }, []);

  useEffect(() => {
    console.log("start");
    if (endpoint) getTrackingData(0, endpoint, setTrackingData, 3);
  }, [endpoint]);

  return (
    <div>
      <Source id="devices" geoJsonSource={trackingData} />
      {crops &&
        crops.data.features.map((feature: any, index: number) => {
          return (
            <Layer
              key={feature.properties.width}
              type="line"
              id={`device${index}`}
              sourceId="devices"
              paint={paintStyles(feature.properties.width)}
            />
          );
        })}
    </div>
  );
};

export default TrackingDrawWrapper;
