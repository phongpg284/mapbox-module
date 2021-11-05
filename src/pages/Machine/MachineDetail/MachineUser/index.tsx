import './style.css'
import columns from './columns'
import { Button, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import MachineUserAddModal from './MachineUserAddModal'
const MachineUser = ({ id }: any) => {
    const [isUpdate, setIsUpdate] = useState(true)

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

    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (isUpdate) {
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/machine-user/',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                requestBody: {
                    action: 'read',
                    machine_id: id,
                },
            })
            setIsUpdate(false)
        }
    }, [isUpdate])

    const [userList, setUserList] = useState<any>([])
    useEffect(() => {
        if (!isFetching && response?.data && !response?.hasError) {
            const convertUserList = []
            for (const { user } of response.data) {
                const newUser = {
                    ...user,
                }
                convertUserList.push(newUser)
            }
            setUserList(convertUserList)
        }
    }, [response])

    const [isShowMachineUserAddModal, setIsShowMachineUserAddModal] =
        useState(false)

    const handleShowMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(true)
    }

    const handleHideMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(false)
    }

    const reFetchAfterUpdate = () => {
        setIsUpdate(true);
    }


    return (
        <div className="machine-users-container">
            <div className="machine-users-control">
                <div className="machine-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="machine-list-control-add">
                    <Button onClick={handleShowMachineUserAddModal}>
                        Thêm người dùng
                    </Button>
                </div>
            </div>
            <div className="machine-list-table">
                <Table columns={tableColumns} dataSource={userList} bordered />
            </div>
            <MachineUserAddModal
                update={reFetchAfterUpdate}
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
