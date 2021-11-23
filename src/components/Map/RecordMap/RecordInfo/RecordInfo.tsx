import './index.scss'

import { CalendarOutlined, ColumnWidthOutlined, LoadingOutlined } from '@ant-design/icons'

import { FaMapMarkerAlt, FaSatellite } from 'react-icons/fa'
import { SiSpeedtest } from 'react-icons/si'
import { BiArea } from 'react-icons/bi'
import { GiPathDistance } from 'react-icons/gi'
import { Button, Spin } from 'antd'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'
import BackButton from '../../../BackButton'

const RecordInfoItem = ({ icon, title, content }: any) => {
    return (
        <div className="record-info-item">
            <div className="record-info-item-icon">{icon}</div>
            <div className="record-info-item-stats">
                <div className="record-info-item-content">{content}</div>
                <div className="record-info-item-title">{title}</div>
            </div>
        </div>
    )
}

const RecordInfo = ({ data, taskData, deviceData, isFetching }: any) => {
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
            <div className={`record-info-content`}>
                {isFetching && <Spin indicator={antIcon} tip="Đang tải lộ trình..." />}
                {!isFetching && (
                    <>
                        <div className="record-info-title">Thiết bị {deviceData?.name}</div>
                        <RecordInfoItem icon={<CalendarOutlined />} title="Ngày bắt đầu" content="20/10/2021 10:20 am" />
                        <RecordInfoItem icon={<BiArea />} title="Diện tích làm việc" content="0 km2" />
                        <RecordInfoItem icon={<ColumnWidthOutlined />} title="Độ rộng đường làm việc" content="0 m" />
                        <RecordInfoItem icon={<GiPathDistance />} title="Tổng quãng đường" content={`${data.distance?.[data.distance?.length - 1]?.toFixed(2) ?? ''} m`} />
                        <RecordInfoItem icon={<FaMapMarkerAlt />} title="Độ chính xác trung bình" content={`${average.accuray.toFixed(2) ?? ''} cm`} />
                        <RecordInfoItem icon={<SiSpeedtest />} title="Tốc độ trung bình" content={`${average.speed.toFixed(2) ?? ''} km/h`} />
                        <RecordInfoItem icon={<FaSatellite />} title="GNSS" content={taskData?.gnss ?? ''} />
                        <div className="record-info-control">
                            <BackButton route={`/devices/${deviceData?.id}`} />
                            <Button>
                                <BsArrowDownCircle />
                                Xuất dữ liệu
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default RecordInfo
