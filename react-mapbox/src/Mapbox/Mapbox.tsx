import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { forwardRef, useImperativeHandle } from "react";
import ReactMapboxGl, {
  Layer,
  RotationControl,
  Source,
  ZoomControl,
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { styles } from "./style";
import {
  accessToken,
  defaultCenter,
  defaultZoom,
  fillPaint,
  lineColor,
  linePaint,
  lineWidth,
  polygonFillColor,
  polygonFillOpacity,
} from "./config";
import { FullscreenControl, GeolocateControl, NavigationControl } from "mapbox-gl";

const Mapbox = forwardRef((props, ref) => {
  let drawRef: any;
  // let mapDidLoad;
  const fieldData = localStorage.getItem("fields");
  let JSONData = "";
  if (fieldData) JSONData = JSON.parse(fieldData);
  const dataSource = {
    type: "geojson",
    data: JSONData,
  };

  const Map = ReactMapboxGl({
    accessToken: accessToken,
  });

  const mapDidLoad = (mapbox: any) => {
    mapbox.addControl(new GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), "bottom-right");
    mapbox.addControl(new NavigationControl(), 'bottom-right')
    mapbox.addControl(new FullscreenControl({container: document.querySelector('body')}), "bottom-right");
  }

  useImperativeHandle(ref, () => ({
    saveData() {
      const drawData = drawRef.draw.getAll();
      let updateGeoJSONData;
      const oldData = localStorage.getItem("fields");
      if (oldData) {
        updateGeoJSONData = {
          type: "FeatureCollection",
          features: [...JSON.parse(oldData).features, ...drawData.features],
        };
      } else updateGeoJSONData = drawData;
      localStorage.setItem("fields", JSON.stringify(updateGeoJSONData));
    },
  }));

  const onDrawCreate = ({ features }: any) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }: any) => {
    console.log(features, "ehe");
  };

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/satellite-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={defaultCenter}
        zoom={defaultZoom}
        onStyleLoad={mapDidLoad}
      >
        <Source id="source_id" geoJsonSource={dataSource} />
        <Layer
          type="fill"
          id="polygon-fill"
          sourceId="source_id"
          paint={fillPaint}
        />
        <Layer type="line" id="lines" sourceId="source_id" paint={linePaint} />

        <DrawControl
          ref={(drawControl) => (drawRef = drawControl)}
          displayControlsDefault={false}
          controls={{ polygon: true, trash: true }}
          default_mode="draw_polygon"
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          styles={styles}
          position= "bottom-right"
        />
      </Map>
    </div>
  );
});

export default Mapbox;
