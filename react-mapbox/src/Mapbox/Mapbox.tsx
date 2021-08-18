import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken =
  "pk.eyJ1IjoidHB3Mjg0IiwiYSI6ImNrc2VrYnk0bjExaWIybnJveGFtOGV0eDAifQ.pSJ4eAaCbdrjhzmqXMRK_A";

const Map = ReactMapboxGl({
  accessToken: accessToken,
});

// in render()

const Mapbox = () => {
  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  );
};

export default Mapbox;
