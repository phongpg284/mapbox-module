import { useRef, useState } from "react";
import Mapbox from "../Mapbox";

const LocalSaveMapbox = () => {
  const mapRef = useRef();
  const [fieldData, setFieldData] = useState<any>();
  const handleSubmit = () => {
    (mapRef.current as any).saveData();
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      <Mapbox ref={mapRef} />
    </div>
  );
};

export default LocalSaveMapbox;
