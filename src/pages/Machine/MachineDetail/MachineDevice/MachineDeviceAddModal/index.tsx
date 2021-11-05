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

interface IProjectDeviceAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProjectDeviceAddModal: React.FC<IProjectDeviceAddModal> = ({
    id,
    onClose,
    update,
    visible,
    ...props
}) => {
    const [devices, setDevices] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])
    const [selectDevice, setSelectDevice] = useState<any>([])
    const [selectRole, setSelectRole] = useState<any>([])

    const [response, iseFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/device/',
                method: 'GET',
            })
    }, [visible])

    useEffect(() => {
        if (!iseFetching && response && response.data && !response.hasError) {
            setDevices(response.data)
            console.log(response.data)
        }
    }, [response])

    function onChangeDevice(value: any) {
        console.log(`selected device ${value}`)
        setSelectDevice(value)
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

    const handleAddNewDevice = () => {
        const query = {
            action: 'update',
            device_id: selectDevice,
            machine_id: id,
        }
        console.log(query)

        setRequestUpdate({
            endPoint: 'https://dinhvichinhxac.online/api/machine-device/',
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
        } else if (!iseFetching && response.hasError) {
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
                title="Thêm thiết bị kết nối với máy móc"
                footer={<Button onClick={handleAddNewDevice}>Thêm</Button>}
            >
                <div className="project-device-add-container">
                    {/* <div className="project-device-add-select">
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
                    </div> */}
                    <div className="project-device-add-select">
                        Thiết bị:
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn thiết bị"
                            optionFilterProp="children"
                            onChange={onChangeDevice}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option?.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {devices &&
                                devices.map((device) => (
                                    <Option value={device.id} key={device.id}>
                                        {device.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProjectDeviceAddModal
