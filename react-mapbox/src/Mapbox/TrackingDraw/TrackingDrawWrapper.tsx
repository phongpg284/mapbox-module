import { useEffect, useRef, useState } from "react";
import { Feature, Image, Layer, Popup, Source } from "react-mapbox-gl";
import * as turf from "@turf/turf";
import TrackingInfo from "../TrackingInfo/TrackingInfo";
import { getTrackingData } from "../getTrackingData";
import PaintScaleView from "../../utils/PaintScaleView";

interface ITrackingDrawWrapperProps {
  endpoint?: string;
  crops: any;
  zoom?: number;
}

const TrackingDrawDevice = ({
  endpoint,
  cropData,
  deviceId,
  zoom,
  updateStatisticData,
}: any) => {
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
  const prevTrackingData = useRef({
    lastIndex: 0,
    lastCoordinates: [],
  });

  const distance = useRef(0);

  useEffect(() => {
    return () => {
      setTrackingData({});
    };
  }, []);

  useEffect(() => {
    if (endpoint) getTrackingData(0, endpoint, setTrackingData, deviceId);
  }, [endpoint, deviceId]);

  useEffect(() => {
    if (trackingData) {
      const newDataLength = trackingData.data?.geometry.coordinates.length;
      if (newDataLength > 0) {
        let from = trackingData.data?.geometry.coordinates[prevTrackingData.current.lastIndex];
        let to = trackingData.data?.geometry.coordinates[prevTrackingData.current.lastIndex + 1];
        for (let i = prevTrackingData.current.lastIndex; i < newDataLength; i++) {
          distance.current += turf.distance(turf.point(from), turf.point(to));
          from = to;
          to = trackingData?.data?.geometry.coordinates[i + 1];
        }
        prevTrackingData.current = {
          lastIndex: newDataLength - 1,
          lastCoordinates:
            trackingData?.data?.geometry.coordinates[newDataLength - 1],
        };
        updateStatisticData(deviceId, distance.current);
      }
    }
  }, [trackingData]);
  return (
    <div>
      <Source id={`device-${deviceId}`} geoJsonSource={trackingData} />
      <Layer
        type="line"
        id={`device-${deviceId}`}
        sourceId={`device-${deviceId}`}
        paint={PaintScaleView(cropData.properties.width, zoom)}
      />

      <Image
        id={`device-${deviceId}-icon`}
        url={cropData.properties.icon}
        options={{ pixelRatio: 6 }}
      />
      {/* {deviceId === 0 && (
        <Layer
          type="symbol"
          id={`marker?????`}
          layout={{ "icon-image": `device${deviceId}-icon` }}
        >
          <Feature
            coordinates={trackingData.data.geometry.coordinates[trackingData.data.geometry.coordinates.length -1]}
            onClick={() => setShowPopup(!showPopup)}
          />
        </Layer>
      )} */}

      {trackingData.data.geometry.coordinates.length > 0 && (
        <div>
          <Layer
            type="symbol"
            id={`test_marker-${deviceId}`}
            layout={{ "icon-image": `device-${deviceId}-icon` }}
          >
            <Feature
              coordinates={[105.89424821470598, 20.59760787621294]}
              onClick={() => setShowPopup(!showPopup)}
            />
          </Layer>
          <Layer
            type="symbol"
            id={`marker-${deviceId}`}
            layout={{ "icon-image": `device-${deviceId}-icon` }}
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

interface StatisticDevice {
  name: number;
  width: number;
  distance: number;
}

const TrackingDrawWrapper: React.FC<ITrackingDrawWrapperProps> = ({
  endpoint,
  crops,
  zoom,
}) => {
  const [statistic, setStatistic] = useState<StatisticDevice[]>();
  useEffect(() => {
    console.log("track render");
    const devices = crops?.data?.features.map((feature: any, index: number) => {
      return {
        icon: feature.properties.icon,
        name: index,
      };
    });
    setStatistic(devices);
  }, []);

  const updateStatisticData = (deviceId: number, data: any) => {
    setStatistic((prevState: any) => {
      const newState = prevState.map((device: StatisticDevice) => {
        if (device.name === deviceId) {
          return {
            ...device,
            distance: data,
          };
        }
        else 
        return device
      });
      return newState;
    });
  };

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
            updateStatisticData={updateStatisticData}
          />
        ))}
      <TrackingInfo statisticData={statistic} />
    </div>
  );
};

export default TrackingDrawWrapper;
