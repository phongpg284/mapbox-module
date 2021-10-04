import { useEffect, useState } from "react";
import Mapbox from "../Mapbox";
import * as turf from "@turf/turf";

const BoundingMap = ({ boundingData, match }: any) => {
  console.log(match)
  const [drawData, setDrawData] = useState<any>();
  const [fitBounds, setFitBounds] = useState<any>();
  useEffect(() => {
    fetch("http://localhost:4000/api/bounds/" + match.params.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDrawData({
          data: data.bounding,
          type: "geojson",
        });
        setFitBounds(turf.bbox(data.bounding))
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapper">
      <div className="content">
        <div className="title fw-bold fs-3 mb-4 d-flex">
          <div>Bounding Map</div>
        </div>
      </div>

      <div className="mapbox-container">
        <Mapbox
          maxWidth="100%"
          height="calc(100vh - 175px)"
          boundingData={drawData}
          fitBounds={fitBounds}
        />
      </div>
    </div>
  );
};

export default BoundingMap;
