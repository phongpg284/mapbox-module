import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import MachineAddModal from '../MachineAddModal'

import columns from './columns'
import useFetch from '../../../hooks/useFetch'
import useFilter from '../../../hooks/useFilter'

const MachineList = () => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [machines, setMachines] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (isUpdate) {
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/machine/',
                method: 'GET',
            })
            setIsUpdate(false)
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) setMachines(response.data)
    }, [response])

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleClickInfo = () => {
        showModal()
    }
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên dự án',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/machines/${record.id}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>Info</button>
                    <button>Delete</button>
                </Space>
            ),
        },
    ]

    const [search, onChangeSearch, filterData] = useFilter(machines, "name");

    const reFetchAfterUpdate = () => {
        setIsUpdate(true);
    }

    return (
        <div className="projects-list-wrapper">
            <div className="projects-list-control">
                <div className="projects-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                <div className="projects-list-control-actions">
                    <Button onClick={handleClickInfo}>Thêm thiết bị</Button>
                </div>
            </div>
            <div className="projects-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered />
            </div>
            <MachineAddModal
                centered
                width={1000}
                visible={isModalVisible}
                onClose={handleCancel}
                update={reFetchAfterUpdate}
            />
        </div>
    )
}

export default MachineList
