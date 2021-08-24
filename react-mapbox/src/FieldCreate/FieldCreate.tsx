import "./style.css"
import Mapbox from "../Mapbox"

const FieldCreate = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Create Field on the Map</h1>
        </div>
        <div className="create-form">
            <div className="create-input">
                <input type=""></input>
            </div>
            <div className="submit-buttons">
                <button>Cancel</button>
                <button>Create</button>
            </div>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox/ >
      </div>

    </div>
  );
};

export default FieldCreate