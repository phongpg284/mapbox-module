import "./index.css"
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import { Button, DatePicker, Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import columns from './columns'
const { RangePicker } = DatePicker;

const DeviceDetail = () => {
    const history = useHistory()
    const location = useLocation()
    const handleShowTracks = () => {
        history.push(location.pathname + '/tasks')
    }

    const [tasks, setTasks] = useState([])

    return (
        <div className="device-detail">
            <div className="device-tasks-list-wrapper">
                <div className="device-tasks-list-control">
                    <div className="device-tasks-list-control-search">
                        <Input
                            prefix={
                                <SearchOutlined className="site-form-item-icon" />
                            }
                        />
                    </div>
                    <div className="device-tasks-list-calendar">
                      <RangePicker />
                    </div>
                    <div className="device-tasks-list-control-actions">
                        <Button onClick={handleShowTracks}>
                            Hành trình của thiết bị
                        </Button>
                    </div>
                </div>
                <div className="device-tasks-list-table">
                    <Table columns={columns} dataSource={tasks} bordered />
                </div>
            </div>
        </div>
    )
}

export default DeviceDetail
