import { Divider } from "antd";
import "./index.css";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";

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
  const [isShowRecordInfo, setIsShowRecordInfo] = useState(true);
  const handleClickControl = () => {
    setIsShowRecordInfo(!isShowRecordInfo)
  }
  return (
    <div className="record-info-container">
      <div className="record-info-control" onClick={handleClickControl}>
        <div className="record-info-control-button">
          {isShowRecordInfo && (
            <CaretRightOutlined />
            )}
          {!isShowRecordInfo && (
            <CaretLeftOutlined />
          )}
        </div>
      </div>
      <div className={`record-info-content-${isShowRecordInfo ? "show" : "hide"}`}>
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
    </div>
  )
}

export default RecordInfo;