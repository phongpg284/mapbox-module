import { memo, useEffect, useState } from "react";
import { Feature, Image, Layer, Marker, Popup, Source } from "react-mapbox-gl";
import { getTrackingData } from "./getTrackingData";
interface ITrackingDrawWrapperProps {
  endpoint?: string;
  crops: any;
  zoom?: number;
}

const TrackingDrawDevice = ({ endpoint, cropData, deviceId, zoom }: any) => {
  const paintStyles = (baseWidth: number) => {
    const baseZoom = zoom ? zoom : 16;
    return {
      "line-color": "yellow",
      "line-opacity": 0.5,
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

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    return () => {
      setTrackingData({});
    };
  }, []);

  useEffect(() => {
    if (endpoint) getTrackingData(0, endpoint, setTrackingData, deviceId);
  }, [endpoint, deviceId]);
  return (
    <div>
      <Source id={`device${deviceId}`} geoJsonSource={trackingData} />
      <Layer
        type="line"
        id={`device${deviceId}`}
        sourceId={`device${deviceId}`}
        paint={paintStyles(cropData.properties.width)}
      />

      <Image
        id={`device${deviceId}-icon`}
        url={cropData.properties.icon}
        options={{ pixelRatio: 6 }}
      />
      {trackingData.data.geometry.coordinates.length > 0 && (
        <div>
          <Layer
            type="symbol"
            id={`marker${deviceId}`}
            layout={{ "icon-image": `device${deviceId}-icon` }}
          >
            <Feature
              coordinates={
                trackingData.data.geometry.coordinates[
                  trackingData.data.geometry.coordinates.length - 1
                ]
              }
              onClick={() => setShowPopup(!showPopup)}
            />
          </Layer>
          {showPopup && (
            <Popup
              coordinates={
                trackingData.data.geometry.coordinates[
                  trackingData.data.geometry.coordinates.length - 1
                ]
              }
            >
              <div>
                Coordinates:
                {
                  trackingData.data.geometry.coordinates[
                    trackingData.data.geometry.coordinates.length - 1
                  ]
                }
              </div>
            </Popup>
          )}
        </div>
        // <Marker
        //   coordinates={
        //     trackingData.data.geometry.coordinates[
        //       trackingData.data.geometry.coordinates.length - 1
        //     ]
        //   }
        //   anchor="bottom"
        // >
        //   <img src={cropData.properties.icon} style={{ height: "20px" }} />
        // </Marker>
      )}
    </div>
  );
};

const TrackingDrawWrapper: React.FC<ITrackingDrawWrapperProps> = ({
  endpoint,
  crops,
  zoom,
}) => {
  useEffect(() => {
    console.log("track render");
  });
  return (
    <div>
      {crops &&
        crops.data.features.map((feature: any, index: number) => (
          <TrackingDrawDevice
            key={feature.properties.width}
            endpoint={endpoint}
            cropData={feature}
            deviceId={index}
            zoom={zoom}
          />
        ))}
    </div>
  );
};

export default TrackingDrawWrapper;
