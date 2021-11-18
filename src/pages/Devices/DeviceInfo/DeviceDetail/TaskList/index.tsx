import './style.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Collapse, Table } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { WarningFilled } from '@ant-design/icons'

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

    useEffect(() => {
        setTableData(
            data?.map((task) => {
                return {
                    id: task?.id,
                    device: task?.device_id,
                    machine: task?.machine_id,
                    createdAt: new Date(task?.create_time).toLocaleString(),
                    updatedAt: new Date(task?.update_time).toLocaleString(),
                    key: task?.create_time,
                }
            })
        )
    }, [data])

    const changeConfirmModal = () => {
        setShowConfirm(!showConfirm)
    }

    const columns: any = [
        {
            width: '4%',
            title: 'id',
            key: 'id',
            dataIndex: 'id',
            render: (text: any, record: any) => <div>ID: {record.id}</div>,
        },
        {
            title: '',
            key: 'image',
            dataIndex: 'image',
            width: 50,
            render: () => (
                <img
                    alt="no?"
                    src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
                    className="align-self-center"
                    style={{ height: '40px' }}
                ></img>
            ),
        },
        {
            title: 'Info',
            dataIndex: 'info',
            key: 'info',
            width: 800,
            render: (text: any, record: any) => (
                <div>
                    <div className="fw-bold fs-6">Deivce: {record.device}</div>
                    <div className="fw-bold fs-6">Machine: {record.machine}</div>
                </div>
            ),
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 1000,
            responsive: ['sm'],
            render: (text: any, record: any) => (
                <div>
                    <div>Created Time: {record.createdAt}</div>
                    <div>Updated Time: {record.updatedAt}</div>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <div className="control-buttons">
                    <Link to={`/fields/${record.id}`}>
                        <Button type="primary" size="large">
                            Detail
                        </Button>
                    </Link>

                    <Button
                        type="primary"
                        danger
                        size="large"
                        onClick={() => {
                            changeConfirmModal()
                            setDeleteItem(record)
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ]

    const handleDelete = () => {
        setShowConfirm(false)
        const newTaskData = data?.filter((task: any) => {
            return task.name !== deleteItem.name
        })
        setTableData(newTaskData)
        setDeleteItem(data)
    }

    return (
        <div>
            <div>
                {tableData && tableData.map((task: any) => (
                    <div className="device-task-item">{task.id}</div>
                ))}
            </div>
            <div>
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
            </div>
        </div>
    )
}

export default TaskList
