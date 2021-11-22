import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Button, message, Select } from 'antd'

import useFetch from '../../../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../../../app/config'
import AddModal from '../../../../../components/AddModal'

const { Option } = Select

interface IMachineUserAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const MachineUserAddModal: React.FC<IMachineUserAddModal> = ({ id, onClose, update, visible, ...props }) => {
    const [users, setUsers] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>(['user', 'driver'])
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

    function onChangeUser(value: any) {
        setSelectUser(value)
    }

    function onChangeRole(value: any) {
        setSelectRole(value)
    }

    function onSearch(val: any) {
        console.log('search:', val)
    }

    const [responseUpdate, isFetchingUpdate, setRequestUpdate] = useFetch({} as any)

    const handleAddNewUser = () => {
        const query = {
            action: 'update',
            user_id: selectUser,
            machine_id: id,
        }
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/machine-user/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: query,
        })
    }

    useEffect(() => {
        if (!isFetchingUpdate && responseUpdate && responseUpdate.data && !responseUpdate.hasError) {
            update()
            message.success(responseUpdate.data)
        } else if (!isFetching && response.hasError) {
            message.error(response.hasError)
        }
        onClose()
    }, [responseUpdate])

    return (
        <div className={style.machine_summary_container}>
            <AddModal {...props} visible={visible} onCancel={onClose} width={600} title="Thêm lái máy" footer={<Button onClick={handleAddNewUser}>Thêm</Button>}>
                <div className={style.machine_user_add_container}>
                    {/* <div className="machine-user-add-select">
                        Chức vụ:
                        <Select style={{ width: 200 }} placeholder="Chọn chức vụ" optionFilterProp="children" onChange={onChangeRole} onSearch={onSearch}>
                            {roles &&
                                roles.map((role) => (
                                    <Option value={role.name} key={role.id}>
                                        {role.name}
                                    </Option>
                                ))}
                        </Select>
                    </div> */}
                    <Select
                        className={style.machine_user_add_select}
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Chọn người dùng"
                        optionFilterProp="children"
                        onChange={onChangeUser}
                        onSearch={onSearch}
                        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {users &&
                            users.map((user) => (
                                <Option value={user.id} key={user.id}>
                                    {user.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            </AddModal>
        </div>
    )
}

export default MachineUserAddModal
