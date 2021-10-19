import { Button } from "antd";
import { useHistory, useLocation } from "react-router";

const DeviceDetail = () => {
  const history = useHistory();
  const location = useLocation();
  const handleShowTracks = () => {
    history.push(location.pathname + "/tasks")
  }
  return (
    <div className="device-detail">
        <Button onClick={handleShowTracks}>Hành trình của thiết bị</Button> 
    </div>
  )
}

export default DeviceDetail;