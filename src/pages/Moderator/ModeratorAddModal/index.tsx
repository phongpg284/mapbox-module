import { Button, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import faker from 'faker'
const { Option } = Select

const ModeratorAddModal = ({ ...props }) => {
    const [users, setUsers] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])
    const [selectUser, setSelectUser] = useState<any>([])
    const [selectRole, setSelectRole] = useState<any>([])

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

        setUsers(fakeUsers)
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

    const handleAddNewModerator = async (value: any) => {
        window.alert('Create new mod')
        const query = {
            ...value,
            action: 'create',
        }
        // const res = await fetch(ENDPOINT_URL + '/project/', {
        //     method: 'POST',
        //     body: JSON.stringify(query),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })

        // const result = await res.json()
        // return result
    }

    return (
        <Modal
            {...props}
            title="Thêm quản trị viên"
            footer={<Button onClick={handleAddNewModerator}>Đăng ký</Button>}
        >
            <div className="moderator-add-container">
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
                            <Option value={user.name} key={user.id}>
                                {user.name}
                            </Option>
                        ))}
                    {/* <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option> */}
                </Select>

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
        </Modal>
    )
}

export default ModeratorAddModal
