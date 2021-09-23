import { useContext, useEffect, useState } from "react";
import { Layer, Source } from "react-mapbox-gl";
import { ViewIndexContext } from "./RecordMap";
import * as turf from "@turf/turf";
const paintStyles = (baseWidth: number, zoom: number | undefined) => {
  const baseZoom = zoom || 16;
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

const ViewDrawingData = ({ data, zoom }: any) => {
  const [displayDrawData, setDisplayDrawData] = useState<any>({
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  });
  const viewIndex = useContext(ViewIndexContext);
  console.log(viewIndex, "hehe");

  useEffect(() => {
    if (data)
      setDisplayDrawData({
        type: "geojson",
        data: turf.lineString(data),
      });
  }, []);

  useEffect(() => {
    const showPoint = data.slice(0, viewIndex + 1);
    if (showPoint.length >= 2)
      setDisplayDrawData({
        type: "geojson",
        data: turf.lineString(showPoint),
      });
    else
      setDisplayDrawData({
        type: "geojson",
        data: turf.point(showPoint[0]),
      });
  }, [viewIndex]);

  useEffect(() => {
    console.log("view render", data.length);
  });

  return (
    <div>
      <Source id="view-device" geoJsonSource={displayDrawData} />
      <Layer
        type="line"
        id="view-device"
        sourceId="view-device"
        paint={paintStyles(3, zoom)}
      />
    </div>
  );
};

export default ViewDrawingData;
