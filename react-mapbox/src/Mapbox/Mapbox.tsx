import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./style.css";


import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { render } from "react-dom";
import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "mapbox-gl";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { defaultDrawStyles } from "./style";
import {
  defaultAccessToken,
  defaultCenter,
  defaultFillPaint,
  defaultLinePaint,
  defaultShowFieldDisplay,
  defaultShowLineDisplay,
  defaultZoom,
} from "./config";


import mapboxgl from 'mapbox-gl';
// @ts-ignore
mapboxgl.workerClass = require('mapbox-gl/dist/mapbox-gl-csp-worker').default;

//@ts-ignore
ReactMapboxGl.workerClass = require('mapbox-gl/dist/mapbox-gl-csp-worker').default;


type LayerType = "streets-v11" | "satellite-v9" | "light-v10" | "dark-v10";
interface IProps {
  accessToken?: string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  data?: any;
  drawStyles?: any;
  displayStyles?: any;
}

const Mapbox: any = forwardRef<any, IProps>(({ ...props }, ref) => {
  let drawRef: any;
  const [visibleLayer, setVisibleLayer] = useState<LayerType>("satellite-v9");
  const mapboxInstance = useRef(null);

  const dataSource = {
    type: "geojson",
    data: props.data? props.data : "",
  };

  const Map = ReactMapboxGl({
    accessToken: props.accessToken ? props.accessToken : defaultAccessToken,
  });

  const handleChangeLayer = (e: any) => {
    setVisibleLayer(e.target.id);
  };

  const menu = (
    <div className="layers">
      <div className="layer-option">
        <input
          id="satellite-v9"
          type="radio"
          name="rtoggle"
          value="satellite"
          onClick={handleChangeLayer}
          checked={visibleLayer === "satellite-v9"}
        ></input>
        <label className="layer-label">satellite</label>
      </div>
      <div className="layer-option">
        <input
          id="light-v10"
          type="radio"
          name="rtoggle"
          value="light"
          onClick={handleChangeLayer}
          checked={visibleLayer === "light-v10"}
        ></input>
        <label className="layer-label">light</label>
      </div>
      <div className="layer-option">
        <input
          id="dark-v10"
          type="radio"
          name="rtoggle"
          value="dark"
          onClick={handleChangeLayer}
          checked={visibleLayer === "dark-v10"}
        ></input>
        <label className="layer-label">dark</label>
      </div>
      <div className="layer-option">
        <input
          id="streets-v11"
          type="radio"
          name="rtoggle"
          value="streets"
          onClick={handleChangeLayer}
          checked={visibleLayer === "streets-v11"}
        ></input>
        <label className="layer-label">streets</label>
      </div>
    </div>
  );
  class LayerControl {
    _map: any;
    _container: any;
    onAdd(map: any) {
      this._map = map;
      this._container = document.createElement("div");
      this._container.className = "mapboxgl-ctrl";
      render(menu, this._container);
      return this._container;
    }

    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }

  const mapDidLoad = (mapbox: any) => {
    mapboxInstance.current = mapbox;
    mapbox.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );
    mapbox.addControl(new NavigationControl(), "bottom-right");
    mapbox.addControl(
      new FullscreenControl({
        container: document.querySelector(".mapboxgl-map") as any,
      }),
      "bottom-right"
    );
    mapbox.addControl(new LayerControl(), "top-right");
  };

  useImperativeHandle(ref, () => ({
    getDrawData() {
      const drawData = drawRef.draw.getAll();
      return drawData
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
        style={`mapbox://styles/mapbox/${visibleLayer}`}
        containerStyle={{
          height: props.height ? props.height : "100vh",
          width: props.width ? props.width : "100vw",
          maxWidth: props.maxWidth ? props.maxWidth : "100%",
          maxHeight: props.maxHeight ? props.maxHeight : "100%",
        }}
        center={defaultCenter}
        zoom={defaultZoom}
        onStyleLoad={mapDidLoad}
      >
        <div className="data-display">
          {(defaultShowFieldDisplay || defaultShowLineDisplay) && (
            <Source id="source_id" geoJsonSource={dataSource} />
          )}
          {defaultShowFieldDisplay && (
            <Layer
              type="fill"
              id="polygon-fill"
              sourceId="source_id"
              paint={props.displayStyles?.fillPaint ? props.displayStyles?.fillPaint : defaultFillPaint}
            />
          )}
          {defaultShowLineDisplay && (
            <Layer
              type="line"
              id="lines"
              sourceId="source_id"
              paint={props.displayStyles?.linePaint ? props.displayStyles?.linePaint : defaultLinePaint}
            />
          )}
        </div>

        {mapboxInstance && (
          <DrawControl
            ref={(drawControl) => (drawRef = drawControl)}
            displayControlsDefault={false}
            controls={{ polygon: true, trash: true }}
            default_mode="draw_polygon"
            onDrawCreate={onDrawCreate}
            onDrawUpdate={onDrawUpdate}
            styles={props.drawStyles? props.drawStyles : defaultDrawStyles}
            position="bottom-right"
          />
        )}
      </Map>
    </div>
  );
});

export default Mapbox;
