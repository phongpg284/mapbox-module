import './index.scss'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import { Button, Col, Collapse, DatePicker, Empty, Row, Select, Spin, Statistic, Table } from 'antd'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { GoPrimitiveDot } from 'react-icons/go'

import columns from './columns'
import useFetch from '../../../../hooks/useFetch'
import TaskList from './TaskList'
import { ENDPOINT_URL } from '../../../../app/config'
import SecondFormat from '../../../../utils/SecondFormat'
const { RangePicker } = DatePicker
const { Option } = Select
const { Panel } = Collapse

const DeviceDetailItem = ({ data }: any) => {
    const { task } = data
    return (
        <div className="device-detail-item-wrapper">
            <Collapse className="device-detail-item-header" expandIconPosition="right">
                <Panel
                    header={
                        <div className="device-detail-item-header-content container-fluid">
                            <div className="row">
                                <div className="col-2">{data?.date}</div>
                                <div className="col-3">
                                    {/* <span>
                                        <GoPrimitiveDot />
                                    </span> */}
                                    {data?.avg_speed?.toFixed(2) ?? ''}
                                </div>
                                <div className="col-3">{data?.avg_accuracy?.toFixed(2) ?? ''}</div>
                                <div className="col-4">{SecondFormat(data?.total_time / 1000)}</div>
                            </div>
                        </div>
                    }
                    key="1"
                >
                    <div className="device-detail-item-collapse-content">
                        <div className="statistic-list">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Tốc độ trung bình" value={data?.avg_speed?.toFixed(2) ?? ''} suffix="km/h" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Độ chính xác trung bình" value={data?.avg_accuracy?.toFixed(2) ?? ''} suffix="cm" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Tổng thời gian" value={SecondFormat(data?.total_time / 1000)} />
                                </Col>
                            </Row>
                        </div>
                        <div className="device-detail-task-list">
                            <div className="device-detail-task-list-title">Lịch trình làm việc</div>
                            <TaskList data={task} />
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

const DeviceDetail = ({ id, currentDateData, isFetching }: any) => {
    const history = useHistory()
    const location = useLocation()

    const handleShowTracks = () => {
        history.push(location.pathname + '/tasks')
    }

    const [response, isFetchingDateRange, setRequest] = useFetch({} as any)
    const [data, setData] = useState<any[]>([])

    const handleChangeDate = (dates: any, dateString: any) => {
        const start = dateString[0].split('-').reverse().join('/') + ' 0:00:00'
        const end = dateString[1].split('-').reverse().join('/') + ' 23:59:59'
        console.log(start, end)
        setRequest({
            endPoint: ENDPOINT_URL + '/task-info/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                device_id: id,
                start: start,
                end: end,
            },
        })
    }

    useEffect(() => {
        const convertData = []
        if (currentDateData) {
            for (const [key, value] of Object.entries(currentDateData)) {
                convertData.push({
                    ...(value as any),
                    date: key,
                })
            }
            setData(convertData)
        }
    }, [currentDateData])

    useEffect(() => {
        if (!isFetchingDateRange && response && response.data && !response.hasError) {
            const convertData = []
            for (const [key, value] of Object.entries(response.data)) {
                convertData.push({
                    ...(value as any),
                    date: key,
                })
            }
            setData(convertData)
        }
    }, [response])

    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

    const [selectLastRange, setSelectLastRange] = useState(3)
    const handleSelectLastRange = (obj: any) => {
        console.log(obj.value)
    }

    return (
        <div className="device-detail">
            <div className="device-tasks-list-wrapper">
                <div className="device-tasks-list-control">
                    <div className="device-tasks-list-control-last-range">
                        <Select value={selectLastRange} style={{ width: 120 }} onChange={handleSelectLastRange}>
                            <Option value={3}>3 ngày</Option>
                            <Option value={7}>7 ngày</Option>
                            <Option value={30}>30 ngày</Option>
                        </Select>
                    </div>
                    <div className="device-tasks-list-calendar">
                        <RangePicker onChange={handleChangeDate} />
                    </div>
                </div>
                <div className="device-tasks-list-item">
                    <div className="device-tasks-list-item-header container-fluid">
                        <div className="row">
                            <div className="col-2">Ngày</div>
                            <div className="col-3">Tốc độ (km/h)</div>
                            <div className="col-3">Độ chính xác (cm)</div>
                            <div className="col-4">Tổng thời gian</div>
                        </div>
                    </div>
                    {(isFetchingDateRange || isFetching) && <Spin indicator={antIcon} />}
                    {data && data.map((deviceData) => <DeviceDetailItem key={deviceData.date} data={deviceData} />)}
                    {data.length === 0 && (
                        <div>
                            <Empty />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeviceDetail
