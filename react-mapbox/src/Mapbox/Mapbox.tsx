import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { styles } from "./style";
import { accessToken, defaultCenter, defaultZoom} from "./config";

const Map = ReactMapboxGl({
  accessToken: accessToken,
});

const Mapbox = () => {
  const onDrawCreate = ({ features }: any) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }: any) => {
    console.log(features);
  };

  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
      center={defaultCenter}
      zoom={defaultZoom}
    >
      {/* <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer> */}
      <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} styles={styles}/>
    </Map>
  );
};

export default Mapbox;
