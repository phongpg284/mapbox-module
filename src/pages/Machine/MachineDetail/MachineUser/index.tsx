import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'

import MachineUserAddModal from './MachineUserAddModal'

import columns from './columns'
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'
import useFilter from '../../../../hooks/useFilter'

const MachineUser = ({ id, data, refetch }: any) => {
    const history = useHistory()
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
                    <button className={style.control_button}>
                        <AiOutlineDelete />
                    </button>
                </Space>
            ),
        },
    ]

    const [userList, setUserList] = useState<any>([])
    useEffect(() => {
        if (data) {
            const convertUserList = []
            for (const { user } of data) {
                const newUser = {
                    ...user,
                }
                convertUserList.push(newUser)
            }
            setUserList(convertUserList)
        }
    }, [data])

    const [isShowMachineUserAddModal, setIsShowMachineUserAddModal] = useState(false)

    const handleShowMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(true)
    }

    const handleHideMachineUserAddModal = () => {
        setIsShowMachineUserAddModal(false)
    }

    const [search, onChangeSearch, filterData] = useFilter(userList, 'name')

    return (
        <div className={style.machine_users_list_wrapper}>
            <div className={style.machine_users_list_control}>
                <div className={style.machine_users_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên người dùng" />
                </div>
                <div className={style.machine_users_list_control_actions}>
                    <Button onClick={handleShowMachineUserAddModal}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>
            <div className="machine-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered />
            </div>
            <MachineUserAddModal update={refetch} id={id} centered width={800} visible={isShowMachineUserAddModal} onClose={handleHideMachineUserAddModal} />
        </div>
    )
}

export default MachineUser
