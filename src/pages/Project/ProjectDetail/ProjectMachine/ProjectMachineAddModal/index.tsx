import './index.scss'
import { Button, message, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import useFetch from '../../../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../../../app/config'
const { Option } = Select

interface IProjectMachineAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProjectMachineAddModal: React.FC<IProjectMachineAddModal> = ({
    id,
    onClose,
    update,
    visible,
    ...props
}) => {
    const [machines, setMachines] = useState<any[]>([])
    const [selectMachine, setSelectMachine] = useState<any>([])
    const [roles, setRoles] = useState<any[]>(["user", "driver"])
    const [selectRole, setSelectRole] = useState<any>([])

    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/machine/',
                method: 'GET',
            })
    }, [visible])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setMachines(response.data)
        }
    }, [response])

    function onChangeMachine(value: any) {
        console.log(`selected machine ${value}`)
        setSelectMachine(value)
    }

    function onSearch(val: any) {
        console.log('search:', val)
    }

    const [responseUpdate, isFetchingUpdate, setRequestUpdate] = useFetch(
        {} as any
    )

    const handleAddNewMachine = () => {
        const query = {
            action: 'update',
            machine_id: selectMachine,
            project_id: id,
        }
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/project-machine/',
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
        ) {
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
                title="Thêm máy móc vào dự án"
                footer={
                    <Button onClick={handleAddNewMachine}>Thêm vào dự án</Button>
                }
            >
                <div className="project-machine-add-container">
                    {/* <div className="project-machine-add-select">
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
                    <div className="project-machine-add-select">
                        Thiết bị:
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn thiết bị"
                            optionFilterProp="children"
                            onChange={onChangeMachine}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option?.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {machines &&
                                machines.map((machine) => (
                                    <Option value={machine.id} key={machine.id}>
                                        {machine.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProjectMachineAddModal
