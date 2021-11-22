import style from './index.module.scss'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, message, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import columns from './columns'
import useFetch from '../../../hooks/useFetch'
import ProjectAddModal from '../ProjectAddModal'
import ProjectSummaryModal from '../ProjectSummaryModal'
import ProjectEditModal from '../ProjectEditModal'
import useFilter from '../../../hooks/useFilter'
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal'
import { ENDPOINT_URL } from '../../../app/config'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'
import { Sorter } from '../../../utils/sorter'
import Table from '../../../components/Table'

const ProjectList = () => {
    const [isUpdate, setIsUpdate] = useState(true)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [viewId, setViewId] = useState(0)

    const handleShowAddProject = () => {
        setIsAddModalVisible(true)
    }

    const handleShowEditProject = (id: number) => {
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

    const handleHideAddProject = () => {
        setIsAddModalVisible(false)
    }

    const handleHideEditProject = () => {
        setIsEditModalVisible(false)
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên dự án',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={`/projects/${record.id}`}>{text}</Link>,
            sorter: {
                compare: Sorter.DEFAULT,
            },    
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
                    <button className={style.control_button} onClick={() => handleShowEditProject(record.id)}>
                        <AiOutlineEdit />
                    </button>
                    <button className={style.control_button} onClick={() => handleDelete(record.id, record.name)}>
                        <AiOutlineDelete />
                    </button>
                </Space>
            ),
        },
    ]
    const [data, setData] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)
    useEffect(() => {
        if (isUpdate) {
            setRequest({
                endPoint: ENDPOINT_URL + '/project/',
                method: 'GET',
            })
            setIsUpdate(false)
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
        }
    }, [response])

    const [search, onChangeSearch, filterData] = useFilter(data, 'name')

    const reFetchAfterUpdate = () => {
        setIsUpdate(true)
    }

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [selectDeleteName, setSelectDeleteName] = useState('')
    const [deleteResponse, isDeleting, setDeleteRequest] = useFetch({} as any)

    const handleConfirmDelete = () => {
        setDeleteRequest({
            endPoint: ENDPOINT_URL + '/project/',
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
        <div className={style.projects_list_wrapper}>
            <div className={style.projects_list_title}>Danh sách dự án</div>
            <div className={style.projects_list_control}>
                <div className={style.projects_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Tên dự án" value={search} onChange={onChangeSearch} />
                </div>
                <div className={style.projects_list_control_actions}>
                    <Button onClick={handleShowAddProject}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>
            <div className={style.projects_list_table}>
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />
            </div>
            <DeleteConfirmModal title={`dự án ${selectDeleteName}`} visible={deleteModalVisible} setVisible={setDeleteModalVisible} handleOK={handleConfirmDelete} />
            <ProjectAddModal update={reFetchAfterUpdate} centered width={1000} visible={isAddModalVisible} onClose={handleHideAddProject} />
            <ProjectSummaryModal centered width={800} visible={isSummaryModalVisible} onClose={handleHideSummary} id={viewId} />
            <ProjectEditModal update={reFetchAfterUpdate} centered width={800} visible={isEditModalVisible} onClose={handleHideEditProject} id={viewId} />
        </div>
    )
}

export default ProjectList
