import './index.css'

import { Link, useHistory } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import faker from 'faker'
import columns from './columns'
import { useEffect, useState } from 'react'
import ModeratorAddModal from '../ModeratorAddModal'
import useFetch from '../../../hooks/useFetch'

const ModeratorList = () => {
    const history = useHistory()
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/moderators/${record.id}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button
                        danger
                        onClick={() => handleClickDelete(record.index)}
                    >
                        Xoá
                    </Button>
                </Space>
            ),
        },
    ]
    // const data = []
    // for (let i = 0; i < 50; i++) {
    //     data.push({
    //         index: i,
    //         name: faker.name.findName(),
    //         username: faker.internet.userName(),
    //         phone: faker.phone.phoneNumber(),
    //         role: faker.name.jobTitle(),
    //     })
    // }

    const [data, setData] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)
    useEffect(() => {
        setRequest({
            endPoint: 'https://dinhvichinhxac.online/api/user/',
            method: 'GET',
        })
    }, [])

    useEffect(() => {        
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
        }
    }, [response])

    const [showModal, setShowModal] = useState(false)

    const handleClickDelete = (index: number) => {
        window.alert('delete mod id: ' + index)
    }

    const handleAddModerator = () => {
        setShowModal(true)
    }

    return (
        <div className="moderators-list-wrapper">
            <div className="moderators-list-control">
                <div className="moderators-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                    />
                </div>
                <div className="moderators-list-control-actions">
                    <Button onClick={handleAddModerator}>
                        Thêm quản trị viên
                    </Button>
                </div>
            </div>
            <div className="moderators-list-table">
                <Table columns={tableColumns} dataSource={data} bordered />;
            </div>

            <ModeratorAddModal
                visible={showModal}
                footer={null}
                title="Thêm quản trị viên"
                onCancel={() => setShowModal(false)}
            />
        </div>
    )
}

export default ModeratorList
