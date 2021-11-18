import './style.scss'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import { Button, Collapse, Descriptions, Table } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { WarningFilled } from '@ant-design/icons'
import SecondFormat from '../../../../../utils/SecondFormat'

const { Panel } = Collapse

export interface ITaskData {
    id: number
    device_id: number
    machine_id: number
    create_time: string
    update_time: string
}

interface ITaskListProps {
    data: ITaskData[]
}

const TaskList = ({ data }: Partial<ITaskListProps>) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteItem, setDeleteItem] = useState<any>()
    const [tableData, setTableData] = useState<any>()
    const history = useHistory()

    useEffect(() => {
        setTableData(
            data?.map((task) => {
                return {
                    ...task,
                    created_time: new Date(task?.create_time).toLocaleString(),
                    updated_time: new Date(task?.update_time).toLocaleString(),
                    key: task?.create_time,
                }
            })
        )
    }, [data])

    const changeConfirmModal = () => {
        setShowConfirm(!showConfirm)
    }

    const handleDelete = () => {
        setShowConfirm(false)
        const newTaskData = data?.filter((task: any) => {
            return task.name !== deleteItem.name
        })
        setTableData(newTaskData)
        setDeleteItem(data)
    }

    const handleClickTaskItem = (id: number) => {
        history.push(`/task/${id}`)
    }

    return (
        <div>
            <div>
                {tableData &&
                    tableData.map((task: any) => (
                        <div className="device-task-item" key={task.id} onClick={() => handleClickTaskItem(task?.id)}>
                            <Descriptions title={`Lộ trình hoạt động #${task?.id}`}>
                                <Descriptions.Item label="Quãng đường">{`${task?.distance.toFixed(2) ?? ''} km`}</Descriptions.Item>
                                <Descriptions.Item label="Độ chính xác">{`${task?.accuracy.toFixed(2) ?? ''} cm`}</Descriptions.Item>
                                <Descriptions.Item label="Tốc độ">{`${task?.speed.toFixed(2) ?? ''} km/h`}</Descriptions.Item>
                                <Descriptions.Item label="Tổng thời gian">{`${SecondFormat(task?.time)}`}</Descriptions.Item>
                                <Descriptions.Item label="Thời gian bắt đầu">{dayjs(task?.create_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                                <Descriptions.Item label="Thời gian kết thúc">{dayjs(task?.update_time).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    ))}
            </div>
            {/* <div>
                <Modal visible={showConfirm} onOk={handleDelete} onCancel={changeConfirmModal} okText="OK" cancelText="Cancel">
                    <div>
                        <WarningFilled
                            style={{
                                fontSize: '30px',
                                margin: '0 10px',
                                color: 'gray',
                            }}
                        />
                        Are you sure want to delete task "{deleteItem?.device}"
                    </div>
                </Modal>
            </div> */}
        </div>
    )
}

export default TaskList
