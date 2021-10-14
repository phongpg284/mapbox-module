import { Divider } from 'antd'
import './index.css'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Stats } from 'fs'

const RecordInfoItem = ({ icon, title, content }: any) => {
    return (
        <div className="record-info-item">
            <div className="record-info-item-title">
                <div className="record-info-item-icon">{icon}</div>
                {title}
            </div>
            <div className="record-info-item-content">{content}</div>
            <Divider className="record-info-item-divider" />
        </div>
    )
}

const RecordInfo = ({ data }: any) => {
    const [isShowRecordInfo, setIsShowRecordInfo] = useState(true)
    const handleClickControl = () => {
        setIsShowRecordInfo(!isShowRecordInfo)
    }

    let total = {
        speed: 0,
        accuracy: 0,
        distance: 0,
    }

    data.forEach((stat: any) => {
        total.speed += stat.speed
        total.accuracy += stat.accuracy
        total.distance += stat.distance
    })

    const average = {
        speed: total.speed / data.length,
        accuray: total.accuracy / data.length,
        distance: total.distance / data.length,
    }

    return (
        <div className="record-info-container">
            <div className="record-info-control" onClick={handleClickControl}>
                <div className="record-info-control-button">
                    {isShowRecordInfo && <CaretRightOutlined />}
                    {!isShowRecordInfo && <CaretLeftOutlined />}
                </div>
            </div>
            <div
                className={`record-info-content-${
                    isShowRecordInfo ? 'show' : 'hide'
                }`}
            >
                <RecordInfoItem />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Operation"
                    content="Other"
                />
                <RecordInfoItem icon={<BorderAllIcon />} title="Area" />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Worked Area"
                    content="0.00 ha"
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Work Width"
                    content="10.0 m"
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Average accuracy"
                    content={`${average.accuray.toFixed(4)}`}
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Distance"
                    content={`${total.distance.toFixed(4)} m`}
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Average Speed"
                    content={`${average.speed.toFixed(4)} km/h`}
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="GNSS Source"
                    content="Internal"
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Description"
                />
            </div>
        </div>
    )
}

export default RecordInfo
