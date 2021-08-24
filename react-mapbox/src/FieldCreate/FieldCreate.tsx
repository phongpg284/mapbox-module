import "./style.css"
import Mapbox from "../Mapbox"
import { Button, Input } from "antd";

const FieldCreate = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Create Field on the Map</h1>
        </div>
        <div className="create-form">
            <div className="create-input">
              <Input placeholder="Field name" size="large"></Input>
            </div>
            <div className="submit-buttons">
                <Button type="default" size="large">Cancel</Button>
                <Button type="primary" size="large">Create</Button>
            </div>
        </div>
      </div>
      <div className="mapbox-container">
        <Mapbox maxWidth="100%" height="calc(100vh - 148px)"/>
      </div>

    </div>
  );
};

export default FieldCreate