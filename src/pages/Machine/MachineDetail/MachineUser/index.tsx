import './style.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Space, Table } from 'antd'

import MachineUserAddModal from './MachineUserAddModal'

import columns from './columns'

const MachineUser = ({ id, data, refetch }: any) => {
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/users/${record.id}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>Xóa</button>
                </Space>
            ),
        },
    ]


    const [userList, setUserList] = useState<any>([])
    useEffect(() => {
        if (data) {
            const convertUserList = []
            for (const { user } of data) {
                const newUser = {
                    ...user,
                }
                convertUserList.push(newUser)
            }
            setUserList(convertUserList)
        }
    }, [data])

    const [isShowMachineUserAddModal, setIsShowMachineUserAddModal] =
        useState(false)

    const handleShowMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(true)
    }

    const handleHideMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(false)
    }

    return (
        <div className="machine-users-container">
            <div className="machine-users-control">
                <div className="machine-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="machine-list-control-add">
                    <Button onClick={handleShowMachineUserAddModal}>
                        Thêm lái máy
                    </Button>
                </div>
            </div>
            <div className="machine-list-table">
                <Table columns={tableColumns} dataSource={userList} bordered />
            </div>
            <MachineUserAddModal
                update={refetch}
                id={id}
                centered
                width={800}
                visible={isShowMachineUserAddModal}
                onClose={handleHideMachineUserAddModal}
            />
        </div>
    )
}

export default MachineUser
