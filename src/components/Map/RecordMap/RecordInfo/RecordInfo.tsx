import { Divider, InputNumber, Spin } from 'antd'
import './index.scss'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import { CalendarOutlined, CaretLeftOutlined, CaretRightOutlined, ColumnWidthOutlined, LoadingOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { Select } from 'antd'
import { ViewIndexContext as RecordViewIndex } from '../../RecordMap/RecordMap'
import { ViewIndexContext as TaskViewIndex } from '../../TaskMap/TaskMap'
import { FaMapMarkerAlt, FaSatellite } from 'react-icons/fa';
import { SiSpeedtest } from 'react-icons/si'
import { GiPathDistance } from 'react-icons/gi'
import { BiArea } from 'react-icons/bi'

const { Option } = Select

const RecordInfoItem = ({ icon, title, content }: any) => {
    return (
        <div className="record-info-item">
            <div className="record-info-item-icon">{icon}</div>
            <div className="record-info-item-stats">
                <div className="record-info-item-content">{content}</div>
                <div className="record-info-item-title">{title}</div>
            </div>
            {/* <Divider className="record-info-item-divider" /> */}
        </div>
    )
}

const RecordInfo = ({ data, options, changeSelectTask, isFetching, viewWidthContextKey }: any) => {
    const [isShowRecordInfo, setIsShowRecordInfo] = useState(true)
    const handleClickControl = () => {
        setIsShowRecordInfo(!isShowRecordInfo)
    }

    const [selectedTask, setSelectedTask] = useState()

    function handleChange(value: any) {
        changeSelectTask(value)
        setSelectedTask(value)
    }

    const { viewWidth, setViewWidth } = useContext(viewWidthContextKey === 'record' ? RecordViewIndex : TaskViewIndex)

    const handleChangeWidth = (value: number) => {
        setViewWidth(value)
    }

    let total = {
        speed: 0,
        accuracy: 0,
    }

    data?.speed?.forEach((stat: any) => {
        total.speed += stat
    })
    data?.accuracy?.forEach((stat: any) => {
        total.accuracy += stat
    })

    const average = {
        speed: total.speed / data?.speed?.length,
        accuray: total.accuracy / data?.accuracy?.length,
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    return (
        <div className="record-info-container">
            {/* <div className="record-info-control" onClick={handleClickControl}>
                <div className="record-info-control-button">
                    {isShowRecordInfo && <CaretRightOutlined />}
                    {!isShowRecordInfo && <CaretLeftOutlined />}
                </div>
            </div> */}
            <div className={`record-info-content`}>
                {/* <div style={{ marginBottom: '20px' }}>
                    <div>Chọn lộ trình làm việc:</div>
                    <Select value={selectedTask} style={{ width: 120 }} onChange={handleChange}>
                        {options &&
                            options.map((id: any) => (
                                <Option value={id} key={id}>
                                    {id}
                                </Option>
                            ))}
                    </Select>
                </div>

                <div>
                    <span>Select width: </span>
                    <InputNumber value={viewWidth} style={{ width: 100 }} onChange={handleChangeWidth} />
                </div> */}

                <div className="record-info-title">Thiết bị IMET 20</div>
                {/* <div className="record-info-time">Ngày bắt đầu làm việc: 20/10/2021 10:20 am</div> */}
                {isFetching && selectedTask && <Spin indicator={antIcon} />}
                {/* <RecordInfoItem /> */}
                <RecordInfoItem icon={<CalendarOutlined />} title="Ngày bắt đầu" content="20/10/2021 10:20 am" />
                <RecordInfoItem icon={<BiArea />} title="Diện tích làm việc" content="100 km2" />
                <RecordInfoItem icon={<ColumnWidthOutlined />} title="Độ rộng đường làm việc" content="2 m" />
                <RecordInfoItem icon={<GiPathDistance />} title="Tổng quãng đường" content={`${data.distance?.[data.distance?.length - 1]?.toFixed(4)} m`} />
                <RecordInfoItem icon={<FaMapMarkerAlt />} title="Độ chính xác trung bình" content={`${average.accuray.toFixed(4)} cm`} />
                <RecordInfoItem icon={<SiSpeedtest />} title="Tốc độ trung bình" content={`${average.speed.toFixed(4)} km/h`} />
                <RecordInfoItem icon={<FaSatellite />} title="GNSS" content="A" />
            </div>
        </div>
    )
}

export default RecordInfo
