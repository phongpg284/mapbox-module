import './index.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input, Modal, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import columns from './columns'
import useFetch from '../../../hooks/useFetch'
import ProjectAddModal from '../ProjectAddModal'
import ProjectSummaryModal from '../ProjectSummaryModal'
import ProjectEditModal from '../ProjectEditModal'
import useFilter from '../../../hooks/useFilter'

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
            render: (text: any, record: any) => (
                <Link to={`/projects/${record.id}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button onClick={() => handleShowSummary(record.id)}>
                        Tổng quan
                    </button>
                    <button onClick={() => handleShowEditProject(record.id)}>
                        Cập nhật
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
                endPoint: 'https://dinhvichinhxac.online/api/project/',
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

    return (
        <div className="projects-list-wrapper">
            <div className="projects-list-control me-5">
                <div className="projects-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        placeholder="Tên dự án"
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                <div className="projects-list-control-actions">
                    <Button onClick={handleShowAddProject}>Thêm</Button>
                </div>
            </div>
            <div className="projects-list-table">
                <Table
                    columns={tableColumns}
                    dataSource={filterData}
                    bordered
                    loading={isFetching}
                />
            </div>
            <ProjectAddModal
                update={reFetchAfterUpdate}
                centered
                width={1000}
                visible={isAddModalVisible}
                onClose={handleHideAddProject}
            />
            <ProjectSummaryModal
                centered
                width={800}
                visible={isSummaryModalVisible}
                onClose={handleHideSummary}
                id={viewId}
            />
            <ProjectEditModal
                update={reFetchAfterUpdate}
                centered
                width={800}
                visible={isEditModalVisible}
                onClose={handleHideEditProject}
                id={viewId}
            />
        </div>
    )
}

export default ProjectList
