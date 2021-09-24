import { Divider } from "antd";
import "./index.css";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WindowIcon from '@mui/icons-material/Window';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BorderAllIcon from '@material-ui/icons/BorderAll';

const RecordInfoItem = ({icon, title, content}: any) => {
  return (
    <div className="record-info-item">
      <div className="record-info-item-title">
        <div className="record-info-item-icon">
          {icon}
        </div>
        {title}
      </div>
      <div className="record-info-item-content">
        {content}
      </div>
      <Divider className="record-info-item-divider"/>
    </div>
  )
}

const RecordInfo = () => {
  return (
      <div className="record-info">
        <RecordInfoItem />
        <RecordInfoItem icon={<LocalShippingIcon />} title="Operation" content="Other"/>
        <RecordInfoItem icon={<BorderAllIcon />} title="Area" />
        <RecordInfoItem icon={<LocalShippingIcon />} title="Worked Area" content="0.00 ha"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="Work Width" content="10.0 m"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="Worked Time" content="00:00:00"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="Distance" content="31 m"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="Average Speed" content="0.5 km/h"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="GNSS Source" content="Internal"/>
        <RecordInfoItem icon={<LocalShippingIcon />} title="Description" />
      </div>
  )
}

export default RecordInfo;