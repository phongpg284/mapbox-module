import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Button, message, Select } from 'antd'

import useFetch from '../../../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../../../app/config'
import AddModal from '../../../../../components/AddModal'

const { Option } = Select

interface IMachineDeviceAddModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const MachineDeviceAddModal: React.FC<IMachineDeviceAddModal> = ({ id, onClose, update, visible, ...props }) => {
    const [devices, setDevices] = useState<any[]>([])
    const [selectDevice, setSelectDevice] = useState<any>()

    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/device/',
                method: 'GET',
            })
    }, [visible])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setDevices(response.data)
            console.log(response.data)
        }
    }, [response])

    function onChangeDevice(value: any) {
        console.log(`selected device ${value}`)
        setSelectDevice(value)
    }

    function onSearch(val: any) {
        console.log('search:', val)
    }

    const [responseUpdate, isFetchingUpdate, setRequestUpdate] = useFetch({} as any)

    const handleAddNewDevice = () => {
        if (selectDevice) {
            const query = {
                action: 'update',
                device_id: selectDevice,
                machine_id: id,
            }
            setRequestUpdate({
                endPoint: ENDPOINT_URL + '/machine-device/',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                requestBody: query,
            })
        }
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
        <div className={`machine_summary_container`}>
            <AddModal
                {...props}
                visible={visible}
                onCancel={onClose}
                width={600}
                title="Thêm thiết bị kết nối với máy móc"
                footer={<Button onClick={handleAddNewDevice}>Thêm</Button>}
            >
                <div className={style.machine_device_add_container}>
                    <Select
                        className={style.machine_device_add_select}
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Chọn thiết bị"
                        optionFilterProp="children"
                        onChange={onChangeDevice}
                        onSearch={onSearch}
                        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {devices &&
                            devices.map((device) => (
                                <Option value={device.id} key={device.id}>
                                    {device.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            </AddModal>
        </div>
    )
}

export default MachineDeviceAddModal
