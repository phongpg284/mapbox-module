import './index.css'

import { Link, useHistory } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import columns from './columns'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import useFilter from '../../../hooks/useFilter'
import UserAddModal from '../UserAddModal'

const UserList = () => {
    const history = useHistory()
    const [isUpdate, setIsUpdate] = useState(true)
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
                    {/* <button>SMS</button> */}
                    <button
                        onClick={() => history.push(`/users/${record.id}`)}
                    >
                        Chi tiết
                    </button>
                    <button
                        onClick={() =>
                            history.push(`/users/edit/${record.id}`)
                        }
                    >
                        Cập nhật
                    </button>
                    <button onClick={() => handleClickDelete(record.id)}>
                        Xoá
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
                endPoint: 'https://dinhvichinhxac.online/api/user/',
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

    const handleClickDelete = (index: number) => {
        window.alert('delete user id: ' + index)
    }

    const [search, onChangeSearch, filterData] = useFilter(data, "name");

    const reFetchAfterUpdate = () => {
        setIsUpdate(true);
    }
    return (
        <div className="users-list-wrapper">
            <div className="users-list-control">
                <div className="users-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        value={search}
                        onChange={onChangeSearch}
                        placeholder="Tên người dùng"
                    />
                </div>
                <div className="users-list-control-actions">
                    <Button onClick={handleShowAddProject}>Thêm người dùng</Button>
                </div>
            </div>
            <div className="users-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered loading={isFetching} />;
            </div>
            <UserAddModal
                update={reFetchAfterUpdate}
                centered
                width={800}
                visible={isAddModalVisible}
                onClose={handleHideAddProject}
            />

        </div>
    )
}

export default UserList
