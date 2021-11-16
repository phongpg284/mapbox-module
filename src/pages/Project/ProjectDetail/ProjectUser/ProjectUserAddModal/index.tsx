import './index.scss'
import { useEffect, useState } from 'react'
import { Button, message, Modal, Select } from 'antd'

import faker from 'faker'
import useFetch from '../../../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../../../app/config'

const { Option } = Select

interface IProjectUserAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProjectUserAddModal: React.FC<IProjectUserAddModal> = ({
    id,
    update,
    onClose,
    visible,
    ...props
}) => {
    const [users, setUsers] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])
    const [selectUser, setSelectUser] = useState<any>([])
    const [selectRole, setSelectRole] = useState<any>([])

    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/user/',
                method: 'GET',
            })
    }, [visible])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setUsers(response.data)
        }
    }, [response])

    useEffect(() => {
        //TODO: call api
        let fakeRoles = []
        for (let i = 0; i < 5; i++)
            fakeRoles.push({
                id: i,
                name: faker.name.jobTitle(),
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

    const [responseUpdate, isFetchingUpdate, setRequestUpdate] = useFetch(
        {} as any
    )

    const handleAddNewUser = () => {
        const query = {
            action: 'update',
            user_id: selectUser,
            project_id: id,
        }
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/project-user/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: query,
        })
    }

    useEffect(() => {
        if (
            !isFetchingUpdate &&
            responseUpdate &&
            responseUpdate.data &&
            !responseUpdate.hasError
        )
            {
                update()
                message.success(responseUpdate.data)
            }
        else if (!isFetching && response.hasError) {
            message.error(response.hasError)
        }
        onClose()
    }, [responseUpdate])

    return (
        <div className={`project_summary_container`}>
            <Modal
                {...props}
                visible={visible}
                onCancel={onClose}
                title="Thêm người dùng vào dự án"
                footer={
                    <Button onClick={handleAddNewUser}>Thêm vào dự án</Button>
                }
            >
                <div className="project-user-add-container">
                    <div className="project-user-add-select">
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
                    <div className="project-user-add-select">
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

export default ProjectUserAddModal
