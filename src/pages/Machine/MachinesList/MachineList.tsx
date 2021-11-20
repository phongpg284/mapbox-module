import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, message, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import MachineAddModal from '../MachineAddModal'

import columns from './columns'
import useFetch from '../../../hooks/useFetch'
import useFilter from '../../../hooks/useFilter'
import MachineSummaryModal from '../MachineSummaryModal'
import MachineEditModal from '../MachineEditModal'
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal'
import { ENDPOINT_URL } from '../../../app/config'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'

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
            render: (text: any, record: any) => <Link to={`/machines/${record.id}`}>{text}</Link>,
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={style.control_button} onClick={() => handleShowSummary(record.id)}>
                        <AiOutlineInfoCircle />
                    </button>
                    <button className={style.control_button} onClick={() => handleShowEditMachine(record.id)}>
                        <AiOutlineEdit />
                    </button>
                    <button className={style.control_button} onClick={() => handleDelete(record.id, record.name)}>
                        <AiOutlineDelete />
                    </button>
                </Space>
            ),
        },
    ]

    const [machines, setMachines] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (isUpdate) {
            setRequest({
                endPoint: ENDPOINT_URL + '/machine/',
                method: 'GET',
            })
            setIsUpdate(false)
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) setMachines(response.data)
    }, [response])

    const [search, onChangeSearch, filterData] = useFilter(machines, 'name')

    const reFetchAfterUpdate = () => {
        setIsUpdate(true)
    }

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [selectDeleteName, setSelectDeleteName] = useState('')
    const [deleteResponse, isDeleting, setDeleteRequest] = useFetch({} as any)

    const handleConfirmDelete = () => {
        setDeleteRequest({
            endPoint: ENDPOINT_URL + '/machine/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                action: 'delete',
                pk: viewId,
            },
        })
        setDeleteModalVisible(false)
    }
    const handleDelete = (id: number, name: string) => {
        setSelectDeleteName(name)
        setViewId(id)
        setDeleteModalVisible(true)
    }

    useEffect(() => {
        if (!isDeleting && deleteResponse && deleteResponse.data && !deleteResponse.hasError) {
            reFetchAfterUpdate()
            message.success(deleteResponse.data)
        }
    }, [deleteResponse])

    return (
        <div className={style.machines_list_wrapper}>
            <div className={style.machines_list_title}>Danh sách máy móc</div>
            <div className={style.machines_list_control}>
                <div className={style.machines_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên máy móc" />
                </div>
                <div className={style.machines_list_control_actions}>
                    <Button onClick={handleShowAddMachine}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>
            <div className={style.machines_list_table}>
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />
            </div>
            <MachineAddModal update={reFetchAfterUpdate} centered width={800} visible={isAddModalVisible} onClose={handleHideAddMachine} />
            <MachineSummaryModal centered width={800} visible={isSummaryModalVisible} onClose={handleHideSummary} id={viewId} />
            <MachineEditModal update={reFetchAfterUpdate} centered width={800} visible={isEditModalVisible} onClose={handleHideEditMachine} id={viewId} />
            <DeleteConfirmModal title={`máy móc ${selectDeleteName}`} visible={deleteModalVisible} setVisible={setDeleteModalVisible} handleOK={handleConfirmDelete} />
        </div>
    )
}

export default MachineList
