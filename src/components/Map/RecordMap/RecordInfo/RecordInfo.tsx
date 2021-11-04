import { Divider, InputNumber, Spin } from 'antd'
import './index.css'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import {
    CaretLeftOutlined,
    CaretRightOutlined,
    LoadingOutlined,
} from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { Select } from 'antd'
import { ViewIndexContext as RecordViewIndex } from '../../RecordMap/RecordMap'
import { ViewIndexContext as TaskViewIndex } from '../../TaskMap/TaskMap'

const { Option } = Select

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

const RecordInfo = ({
    data,
    options,
    changeSelectTask,
    isFetching,
    viewWidthContextKey,
}: any) => {
    const [isShowRecordInfo, setIsShowRecordInfo] = useState(true)
    const handleClickControl = () => {
        setIsShowRecordInfo(!isShowRecordInfo)
    }

    const [selectedTask, setSelectedTask] = useState()

    function handleChange(value: any) {
        changeSelectTask(value)
        setSelectedTask(value)
    }

    const { viewWidth, setViewWidth } = useContext(
        viewWidthContextKey === 'record' ? RecordViewIndex : TaskViewIndex
    )

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
                <div style={{ marginBottom: '20px' }}>
                    <span>Select task:</span>
                    <Select
                        value={selectedTask}
                        style={{ width: 120 }}
                        onChange={handleChange}
                    >
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
                    <InputNumber
                        value={viewWidth}
                        style={{ width: 100 }}
                        onChange={handleChangeWidth}
                    />
                </div>
                {isFetching && selectedTask && <Spin indicator={antIcon} />}
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
                    content=""
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Work Width"
                    content=""
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Average accuracy"
                    content={`${average.accuray.toFixed(4)} cm`}
                />
                <RecordInfoItem
                    icon={<LocalShippingIcon />}
                    title="Distance"
                    content={`${data.distance?.[
                        data.distance?.length - 1
                    ]?.toFixed(4)} m`}
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
