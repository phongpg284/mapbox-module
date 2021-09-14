import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./style.css";

import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import { render } from "react-dom";

import { Radio, Space } from "antd";
import * as turf from "@turf/turf";

import mapboxgl from "mapbox-gl";
import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "mapbox-gl";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";

import { defaultDrawStyles } from "./style";
import {
  defaultAccessToken,
  defaultCenter,
  defaultZoom,
  workAreaShowFieldDisplay,
  workAreaShowLineDisplay,
  workAreaFillPaint,
  workAreaLinePaint,
  cropsShowFieldDisplay,
  cropsShowLineDisplay,
  cropsFillPaint,
  cropsLinePaint,
} from "./config";
import TrackingDrawWrapper from "./SourceWrapper";

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
  drawStyles: any;
  displayStyles: any;
  center: [number, number];
  zoom: number;
  interactive: boolean;
  disableScrollZoom: boolean;
  fitBounds: any;
  workArea: any;
  crops: any;
  trackingApiEndpoint: any;
}

const Mapbox: any = memo(
  forwardRef<any, Partial<IProps>>(({ ...props }, ref) => {
    let drawRef: any;
    const [visibleLayer, setVisibleLayer] = useState<LayerType>("satellite-v9");
    // const deviceStyleLayer = useRef();
    
    const mapboxInstance = useRef(null);
    const Map = ReactMapboxGl({
      accessToken: props.accessToken ? props.accessToken : defaultAccessToken,
      maxZoom: 23,
      scrollZoom: !props.disableScrollZoom,
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

    // const popup = new mapboxgl.Popup({
    //   anchor: "top-left",
    // });
    const drawData = (data: any, id: number, mapbox: any, markers: any) => {
      if (!mapbox._fullyLoaded) return;
      const newData = data.map((coordinate: any) => [
        coordinate.y,
        coordinate.x,
      ]);

      if (mapbox) {
        console.log(mapbox);
        const existData = mapbox?.getSource(`deviceNo${id}`)._data;

        markers[id].setLngLat(newData[newData.length - 1]).addTo(mapbox);

        const convertData = turf.lineString(
          existData.geometry.coordinates.concat(newData)
        );
        mapbox?.getSource(`deviceNo${id}`)?.setData(convertData);
      } else return;
    };

    const mapDidLoad = (mapbox: any, loadEvent: any) => {
      console.log("map render");
      console.log(mapbox, loadEvent);

      if (!mapbox) console.log("nomapbox");
      if (props.disableScrollZoom) mapbox.doubleClickZoom.disable();

      if (props.workArea) {
        // marker
        //   // @ts-ignore
        //   .setLngLat(turf.center(props.workArea?.data).geometry.coordinates)
        //   .addTo(mapbox);
        // popup
        //   //@ts-ignore
        //   .setLngLat(turf.center(props.workArea?.data).geometry.coordinates)
        //   .setHTML(`<h5>${marker.getLngLat()}</h5>`)
        //   .addTo(mapbox);
        // function animateMarker(timestamp: any) {
        //   const radius = 20;
        //   marker.setLngLat([
        //     Math.cos(timestamp / 1000) * radius,
        //     Math.sin(timestamp / 1000) * radius,
        //   ]);
        //   popup.setLngLat([
        //     Math.cos(timestamp / 1000) * radius,
        //     Math.sin(timestamp / 1000) * radius,
        //   ]);
        //   marker.addTo(mapbox);
        //   requestAnimationFrame(animateMarker);
        // }
        // requestAnimationFrame(animateMarker);
      }

      if (props.trackingApiEndpoint && props.crops) {
        let markers: any = [];
        for (let i = 0; i < props.crops.data.features.length; i++) {
          let baseWidth = props.crops.data.features[i].properties.width;
          let baseZoom = 16;
          mapbox.addSource(`deviceNo${i}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [],
              },
            },
          });
          mapbox.addLayer({
            id: `deviceNo${i}`,
            type: "line",
            source: `deviceNo${i}`,
            paint: {
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
            },
          });

          let el = document.createElement("img");
          el.src = props.crops.data.features[i].properties.icon;
          el.style.height = "20px";

          markers.push(new mapboxgl.Marker(el));
        }

        // for (let i = 0; i < props.crops.data.features.length; i++) {
        //   getTrackingData(
        //     0,
        //     props.trackingApiEndpoint,
        //     drawData,
        //     i,
        //     mapbox,
        //     markers
        //   );
        // }
      }

      mapboxInstance.current = mapbox;
      mapbox.addControl(new ScaleControl(), "bottom-left");
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
          style={`mapbox://styles/mapbox/satellite-v9`}
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
            {props.workArea &&
              (workAreaShowFieldDisplay || workAreaShowLineDisplay) && (
                <Source id="work_area" geoJsonSource={props.workArea} />
              )}
            {props.workArea && workAreaShowFieldDisplay && (
              <Layer
                type="fill"
                id="polygon-fill"
                sourceId="work_area"
                paint={workAreaFillPaint}
              />
            )}
            {props.workArea && workAreaShowLineDisplay && (
              <Layer
                type="line"
                id="lines_work_area"
                sourceId="work_area"
                paint={workAreaLinePaint}
              />
            )}

            {props.crops && (cropsShowFieldDisplay || cropsShowLineDisplay) && (
              <Source id="crops" geoJsonSource={props.crops} />
            )}
            {props.crops && cropsShowFieldDisplay && (
              <Layer
                type="fill"
                id="polygon-fill"
                sourceId="crops"
                paint={cropsFillPaint}
              />
            )}
            {props.crops && cropsShowLineDisplay && (
              <Layer
                type="line"
                id="lines_crops"
                sourceId="crops"
                paint={cropsLinePaint}
              />
            )}

            {/* {trackingData.current && (
              <div>
                <Source id="deviceHehe" geoJsonSource={trackingData.current} />
                <Layer type="line" id="deviceHehe" sourceId="deviceHehe"/>
              </div>
            )} */}
            <TrackingDrawWrapper endpoint={props.trackingApiEndpoint} />
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
