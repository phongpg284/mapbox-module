import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./style.css";

import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
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

import mapboxgl from "mapbox-gl";
import { Radio, Space } from "antd";
// @ts-ignore
mapboxgl.workerClass = require("mapbox-gl/dist/mapbox-gl-csp-worker").default;

//@ts-ignore
ReactMapboxGl.workerClass =
  require("mapbox-gl/dist/mapbox-gl-csp-worker").default;

type LayerType = "streets-v11" | "satellite-v9" | "light-v10" | "dark-v10";
interface IProps {
  accessToken: string;
  height: string;
  width: string;
  maxHeight: string;
  maxWidth: string;
  data: any;
  drawStyles: any;
  displayStyles: any;
  center: [number, number];
  zoom: number;
  dataTest: any;
  boundingData: any;
  interactive: boolean;
  disableScrollZoom: boolean;
  fitBounds: any;
}

interface IGeoFeature {
  type: string;
  properties: any;
  geometry: {
    type: string;
    coordinates?: [[number, number]];
  };
}
interface IGeoJSON {
  type: string;
  name: string;
  features: IGeoFeature[];
}

const Mapbox: any = memo(
  forwardRef<any, Partial<IProps>>(({ ...props }, ref) => {
    let drawRef: any;
    const [visibleLayer, setVisibleLayer] = useState<LayerType>("satellite-v9");
    const mapboxInstance = useRef(null);
    const Map = ReactMapboxGl({
      accessToken: props.accessToken ? props.accessToken : defaultAccessToken,
      maxZoom: 23,
      scrollZoom: !props.disableScrollZoom
    });

    const handleChangeLayer = (e: any) => {
      setVisibleLayer(e.target.value);
    };

    const menu = (
      <div className="layers">
        <div className="layer-option">
          <Radio.Group onChange={handleChangeLayer} value={visibleLayer}>
            <Space direction="vertical">
              <Radio value="satellite-v9" className="float-start fs-5">
                satellite
              </Radio>
              <Radio value="light-v10" className="float-start fs-5">
                light
              </Radio>
              <Radio value="dark-v10" className="float-start fs-5">
                dark
              </Radio>
              <Radio value="streets-v11" className="float-start fs-5">
                streets
              </Radio>
            </Space>
          </Radio.Group>
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
      console.log("map render");
      if (!mapbox) console.log("nomapbox");
      // mapbox.addSource("route", { type: "geojson", data: "" });
      // mapbox.addLayer({
      //   id: "route",
      //   type: "line",
      //   source: "route",
      //   paint: {
      //     "line-color": "yellow",
      //     "line-opacity": 0.75,
      //     "line-width": 5,
      //   },
      // });
      const indexDataTest = props.dataTest;
      let i = -1;
      let j = 0;
      let data: IGeoJSON = {
        type: "FeatureCollection",
        name: "",
        features: [],
      };
      // setInterval(() => {
      //   fetch("http://localhost:4000/api/users", {
      //     method: "GET",
      //   })
      //     .then((mapData) => mapData.json())
      //     .then((jsonData) => {
      //       if (jsonData && jsonData[indexDataTest]) {
      //         const geoData = jsonData[indexDataTest].bounding;
      //         if (geoData) {
      //           console.log("call");
      //           data.name = geoData.name;
      //           if (i === 0) {
      //             const newData = {
      //               ...geoData.features[j],
      //               geometry: {
      //                 ...geoData.features[j].geometry,
      //                 coordinates: [geoData.features[j].geometry.coordinates[0]],
      //               },
      //             }
      //             data.features.push(newData);
      //           } else {
      //             data.features[j].geometry.coordinates?.push(
      //               geoData.features[j].geometry.coordinates[i]
      //             );
      //           }

      //           // mapbox.flyTo({
      //           //   center:
      //           //     // last(
      //           //     //   (last(geoData.features) as any).geometry.coordinates
      //           //     // ),
      //           //     geoData.features[j].geometry.coordinates[i],
      //           //   speed: 0.8,
      //           // });
      //           mapbox.getSource("route").setData(data);
      //           if (i === geoData.features[j].geometry.coordinates.length()) {
      //             i = 0;
      //             j++;
      //           } else {
      //             i++;
      //           }
      //         } else mapbox.getSource("route").setData("");
      //       }
      //     })
      //     .catch((err) => {});

      //   i++;
      // }, 500);

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
        return drawData;
      },
    }));

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
          center={props.center ? props.center : defaultCenter}
          zoom={props.zoom ? [props.zoom] : defaultZoom}
          onStyleLoad={mapDidLoad}
          fitBounds={props.fitBounds}
        >
          <div className="data-display">
            {props.boundingData &&
              (defaultShowFieldDisplay || defaultShowLineDisplay) && (
                <Source id="source_id" geoJsonSource={props.boundingData} />
              )}
            {props.boundingData && defaultShowFieldDisplay && (
              <Layer
                type="fill"
                id="polygon-fill"
                sourceId="source_id"
                paint={
                  props.displayStyles?.fillPaint
                    ? props.displayStyles?.fillPaint
                    : defaultFillPaint
                }
              />
            )}
            {props.boundingData && defaultShowLineDisplay && (
              <Layer
                type="line"
                id="lines"
                sourceId="source_id"
                paint={
                  props.displayStyles?.linePaint
                    ? props.displayStyles?.linePaint
                    : defaultLinePaint
                }
              />
            )}
          </div>

          {mapboxInstance && (
            <DrawControl
              ref={(drawControl) => (drawRef = drawControl)}
              displayControlsDefault={false}
              controls={{ polygon: true, trash: true }}
              default_mode="draw_polygon"
              position="bottom-right"
              styles={props.drawStyles ? props.drawStyles : defaultDrawStyles}
            />
          )}
        </Map>
      </div>
    );
  })
);

export default Mapbox;
