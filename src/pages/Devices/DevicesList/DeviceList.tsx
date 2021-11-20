import style from './index.module.scss'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, message, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import columns from './columns'

import DeviceAddModal from '../DeviceAddModal'
import useFilter from '../../../hooks/useFilter'
import DeviceEditModal from '../DeviceEditModal'
import DeviceSummaryModal from '../DeviceSummaryModal'

import useFetch from '../../../hooks/useFetch'
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal'
import { ENDPOINT_URL } from '../../../app/config'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'

const DeviceList = () => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [devices, setDevices] = useState([])

    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [viewId, setViewId] = useState(0)
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (isUpdate) {
            setRequest({
                endPoint: ENDPOINT_URL + '/device/',
                method: 'GET',
            })
            setIsUpdate(false)
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError)
            setDevices(
                response.data.map((device: any) => {
                    return {
                        ...device,
                        status: Math.abs(new Date(device.update_time).getTime() - Date.now()) < 120000,
                    }
                })
            )
    }, [response])

    const handleShowAddDevice = () => {
        setIsAddModalVisible(true)
    }

    const handleShowEditDevice = (id: number) => {
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

    const handleHideAddDevice = () => {
        setIsAddModalVisible(false)
    }

    const handleHideEditDevice = () => {
        setIsEditModalVisible(false)
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên thiết bị',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name - b.name,
            render: (text: any, record: any) => <Link to={`/devices/${record.id}`}>{text}</Link>,
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
                    <button className={style.control_button} onClick={() => handleShowEditDevice(record.id)}>
                        <AiOutlineEdit />
                    </button>
                    <button className={style.control_button} onClick={() => handleDelete(record.id, record.name)}>
                        <AiOutlineDelete />
                    </button>
                </Space>
            ),
        },
    ]

    const [search, onChangeSearch, filterData] = useFilter(devices, 'name')

    const reFetchAfterUpdate = () => {
        setIsUpdate(true)
    }

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [selectDeleteName, setSelectDeleteName] = useState('')
    const [deleteResponse, isDeleting, setDeleteRequest] = useFetch({} as any)

    const handleConfirmDelete = () => {
        setDeleteRequest({
            endPoint: ENDPOINT_URL + '/device/',
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
        <div className={style.devices_list_wrapper}>
            <div className={style.devices_list_title}>Danh sách thiết bị</div>
            <div className={style.devices_list_control}>
                <div className={style.devices_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên thiết bị" />
                </div>
                <div className={style.devices_list_control_actions}>
                    <Button onClick={handleShowAddDevice}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>
            <div className={style.devices_list_table}>
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />
            </div>
            <DeviceAddModal update={reFetchAfterUpdate} centered width={800} visible={isAddModalVisible} onClose={handleHideAddDevice} />
            <DeviceSummaryModal centered width={800} visible={isSummaryModalVisible} onClose={handleHideSummary} id={viewId} />
            <DeviceEditModal update={reFetchAfterUpdate} centered width={800} visible={isEditModalVisible} onClose={handleHideEditDevice} id={viewId} />
            <DeleteConfirmModal title={`thiết bị ${selectDeleteName}`} visible={deleteModalVisible} setVisible={setDeleteModalVisible} handleOK={handleConfirmDelete} />
        </div>
    )
}

export default DeviceList
