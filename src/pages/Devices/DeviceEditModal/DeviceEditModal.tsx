import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Spin } from 'antd'

import useFetch from '../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../app/config'
import AddModal from '../../../components/AddModal'

interface IDeviceEditModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const DeviceEditModal: React.FC<IDeviceEditModal> = ({ id, onClose, visible, update, ...props }) => {
    const [form] = Form.useForm()

    const [data, setData] = useState<any>()
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/device/',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                requestBody: {
                    action: 'read',
                    pk: id,
                },
            })
    }, [visible])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
            form.setFieldsValue(response.data)
        }
    }, [response])

    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch({} as any)

    useEffect(() => {
        if (!isFetchingUpdate && updateResponse?.data && !updateResponse.hasError) {
            update()
            message.success(updateResponse.data)
            onClose()
        }
    }, [updateResponse])

    const onFinish = (value: any) => {
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/device/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                ...value,
                pk: id,
                action: 'update',
            },
        })
    }

    const onFinishFailed = () => {
        message.error('Lỗi cập nhật!')
    }

    const handleSubmitEdit = () => {
        form.submit()
    }

    return (
        <div className={style.device_edit_container}>
            <AddModal {...props} visible={visible} onCancel={onClose} title={`Cập nhật thiết bị ${data?.name}`} footer={<Button onClick={handleSubmitEdit}>Cập nhật</Button>}>
                <div className={style.device_edit_content}>
                    {isFetching && <Spin />}
                    {data && (
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        { required: true },
                                        //@ts-ignore
                                        { type: 'string', warningOnly: true },
                                    ]}
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="sim_imei"
                                    label="IMEI"
                                    rules={[
                                        { required: true },
                                        //@ts-ignore
                                        { type: 'string', warningOnly: true },
                                    ]}
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="caster_ip" label="Caster Ip">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="caster_port" label="Caster Port">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>

                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="ntrip_username" label="Ntrip Username">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>

                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="ntrip_password" label="Ntrip Password">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="mount_point" label="Mount Point">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                </div>
            </AddModal>
        </div>
    )
}

export default DeviceEditModal
