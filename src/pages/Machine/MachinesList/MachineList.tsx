import "./index.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import MachineAddModal from '../MachineAddModal'

import columns from './columns'
import useFetch from '../../../hooks/useFetch'
import useFilter from '../../../hooks/useFilter'
import MachineSummaryModal from '../MachineSummaryModal'
import MachineEditModal from '../MachineEditModal'

const MachineList = () => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [viewId, setViewId] = useState(0)

    const handleShowAddMachine = () => {
        setIsAddModalVisible(true)
    }

    const handleShowEditMachine = (id: number) => {
        setViewId(id)
        setIsEditModalVisible(true)
    }

    const handleShowSummary = (id: number) => {
        setViewId(id)
        setIsSummaryModalVisible(true)
    }

    const handleHideSummary = () => {
        setIsSummaryModalVisible(false)
    }

    const handleHideAddMachine = () => {
        setIsAddModalVisible(false)
    }

    const handleHideEditMachine = () => {
        setIsEditModalVisible(false)
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên máy móc',
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
                    <button onClick={() => handleShowSummary(record.id)} >Tổng quan</button>
                    <button onClick={() => handleShowEditMachine(record.id)}>Cập nhật</button>
                    <button>Xóa</button>
                </Space>
            ),
        },
    ]

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
        if (!isFetching && response && response.data && !response.hasError) 
        setMachines(response.data)
    }, [response])

    const [search, onChangeSearch, filterData] = useFilter(machines, "name");

    const reFetchAfterUpdate = () => {
        setIsUpdate(true);
    }

    return (
        <div className="machines-list-wrapper">
            <div className="machines-list-control">
                <div className="machines-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        value={search}
                        onChange={onChangeSearch}
                        placeholder="Tên máy móc"
                    />
                </div>
                <div className="machines-list-control-actions">
                    <Button onClick={handleShowAddMachine}>Thêm máy móc</Button>
                </div>
            </div>
            <div className="machines-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />
            </div>
            <MachineAddModal
                update={reFetchAfterUpdate}
                centered
                width={800}
                visible={isAddModalVisible}
                onClose={handleHideAddMachine}
            />
            <MachineSummaryModal
                centered
                width={800}
                visible={isSummaryModalVisible}
                onClose={handleHideSummary}
                id={viewId}
            />
            <MachineEditModal
                update={reFetchAfterUpdate}
                centered
                width={800}
                visible={isEditModalVisible}
                onClose={handleHideEditMachine}
                id={viewId}
            />
        </div>
    )
}

export default MachineList
