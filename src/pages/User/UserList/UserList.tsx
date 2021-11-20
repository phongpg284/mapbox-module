import style from './index.module.scss'

import { Link, useHistory } from 'react-router-dom'

import { Button, Input, message, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import columns from './columns'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import useFilter from '../../../hooks/useFilter'
import UserAddModal from '../UserAddModal'
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal'
import { ENDPOINT_URL } from '../../../app/config'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'

const UserList = () => {
    const history = useHistory()
    const [isUpdate, setIsUpdate] = useState(true)
    const [viewId, setViewId] = useState(0)

    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const handleShowAddProject = () => {
        setIsAddModalVisible(true)
    }

    const handleHideAddProject = () => {
        setIsAddModalVisible(false)
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={`/users/${record.id}`}>{text}</Link>,
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={style.control_button} onClick={() => history.push(`/users/${record.id}`)}>
                        <AiOutlineInfoCircle />
                    </button>
                    <button className={style.control_button} onClick={() => history.push(`/users/edit/${record.id}`)}>
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
                endPoint: ENDPOINT_URL + '/user/',
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
            endPoint: ENDPOINT_URL + '/user/',
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
        <div className={style.users_list_wrapper}>
            <div className={style.users_list_title}>Danh sách người dùng</div>
            <div className={style.users_list_control}>
                <div className={style.users_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên người dùng" />
                </div>
                <div className={style.users_list_control_actions}>
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
            <div className={style.users_list_table}>
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />;
            </div>
            <UserAddModal update={reFetchAfterUpdate} centered width={800} visible={isAddModalVisible} onClose={handleHideAddProject} />
            <DeleteConfirmModal title={`dự án ${selectDeleteName}`} visible={deleteModalVisible} setVisible={setDeleteModalVisible} handleOK={handleConfirmDelete} />
        </div>
    )
}

export default UserList
