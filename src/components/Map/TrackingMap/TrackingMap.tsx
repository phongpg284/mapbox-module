import { useEffect, useState } from "react";
import Mapbox from "../Mapbox";

import * as turf from "@turf/turf";

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN_ACCESS;

const TrackingMap = ({match}: any) => {
  const id = match?.params?.id;
  console.log(id)
  const [workAreaData, setWorkAreaData] = useState<any>();
  const [cropsData, setCropsData] = useState<any>();
  const [center, setCenter] = useState<any>();
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/get_project", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const workArea = data.project.work_area;
        const bbox: [number, number, number, number] = [
          workArea.bottom,
          workArea.right,
          workArea.top,
          workArea.left,
        ];
        setWorkAreaData({
          type: "geojson",
          data: turf.bboxPolygon(bbox),
        });
        setCenter(turf.center(turf.bboxPolygon(bbox)).geometry.coordinates);

        const crops = data.project.devices.map((device: any) =>
          turf.polygon(
            [
              device.crop.map((coordinate: any) => [
                coordinate[1],
                coordinate[0],
              ]),
            ],
            { icon: device.icon, width: device.width }
          )
        );
        const featureCollections = turf.featureCollection(crops);
        setCropsData({
          type: "geojson",
          data: featureCollections,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="title fw-bold fs-3 mb-4 d-flex">
          <div>Tracking Map</div>
        </div>
      </div>
      <div className="mapbox-container">
      <Mapbox
          accessToken={accessToken}
          workArea={workAreaData}
          crops={cropsData}
          fitBounds={workAreaData?.data?.bbox}
          trackingApiEndpoint={
            process.env.REACT_APP_API_URL + "/get_track?last_index"
          }
          // center={center}
          maxWidth="100%"
          height="calc(100vh - 175px)"
          lockZoom
        />
      </div>
    </div>
  );
};

export default TrackingMap;
