import './index.scss'
import { Button, message, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import useFetch from '../../../../../hooks/useFetch'
import faker from 'faker'
const { Option } = Select

const columns = [
    {
        key: 'ckey',
        dataIndex: 'ckey',
        render: (text: string) => (
            <h6 style={{ fontWeight: 'bold' }}>{text}</h6>
        ),
    },
    {
        key: 'value',
        dataIndex: 'value',
    },
]

interface IMachineUserAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const MachineUserAddModal: React.FC<IMachineUserAddModal> = ({
    id,
    onClose,
    update,
    visible,
    ...props
}) => {
    const [users, setUsers] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])
    const [selectUser, setSelectUser] = useState<any>([])
    const [selectRole, setSelectRole] = useState<any>([])

    const [response, iseFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/user/',
                method: 'GET',
            })
    }, [visible])

    useEffect(() => {
        if (!iseFetching && response && response.data && !response.hasError) {
            setUsers(response.data)
        }
    }, [response])

    useEffect(() => {
        //TODO: call api
        let fakeUsers = []
        let fakeRoles = []
        for (let i = 0; i < 5; i++)
            fakeRoles.push({
                id: i,
                name: faker.name.jobTitle(),
            })

        for (let i = 0; i < 15; i++)
            fakeUsers.push({
                id: i,
                name: faker.name.findName(),
            })

        setRoles(fakeRoles)
    }, [])

    function onChangeUser(value: any) {
        console.log(`selected user ${value}`)
        setSelectUser(value)
    }

    function onChangeRole(value: any) {
        console.log(`selected role ${value}`)
        setSelectRole(value)
    }

    function onSearch(val: any) {
        console.log('search:', val)
    }

    const [responseUpdate, iseFetchingUpdate, setRequestUpdate] = useFetch(
        {} as any
    )

    const handleAddNewUser = () => {
        const query = {
            action: 'update',
            user_id: selectUser,
            machine_id: id,
        }
        setRequestUpdate({
            endPoint: 'https://dinhvichinhxac.online/api/machine-user/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: query,
        })
    }

    useEffect(() => {
        if (
            !iseFetchingUpdate &&
            responseUpdate &&
            responseUpdate.data &&
            !responseUpdate.hasError
        ) {
            update()
            message.success(responseUpdate.data)
        }
        else if (!iseFetching && response.hasError) {
            message.error(response.hasError)
        }
        onClose()
    }, [responseUpdate])

    return (
        <div className={`machine_summary_container`}>
            <Modal
                {...props}
                visible={visible}
                onCancel={onClose}
                title="Thêm lái máy"
                footer={
                    <Button onClick={handleAddNewUser}>Thêm</Button>
                }
            >
                <div className="machine-user-add-container">
                    <div className="machine-user-add-select">
                        Chức vụ:
                        <Select
                            style={{ width: 200 }}
                            placeholder="Chọn chức vụ"
                            optionFilterProp="children"
                            onChange={onChangeRole}
                            onSearch={onSearch}
                        >
                            {roles &&
                                roles.map((role) => (
                                    <Option value={role.name} key={role.id}>
                                        {role.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                    <div className="machine-user-add-select">
                        Người dùng:
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn người dùng"
                            optionFilterProp="children"
                            onChange={onChangeUser}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option?.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {users &&
                                users.map((user) => (
                                    <Option value={user.id} key={user.id}>
                                        {user.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MachineUserAddModal
