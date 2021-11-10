import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, message, Spin } from 'antd'

import useFetch from '../../../hooks/useFetch'

interface IDeviceEditModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const DeviceEditModal: React.FC<IDeviceEditModal> = ({
    id,
    onClose,
    visible,
    update,
    ...props
}) => {
    const [form] = Form.useForm()

    const [data, setData] = useState<any>()
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/device/',
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
        }
    }, [response])

    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch(
        {} as any
    )

    useEffect(() => {
        if (
            !isFetchingUpdate &&
            updateResponse?.data &&
            !updateResponse.hasError
        ) {
            update()
            message.success(updateResponse.data)
            onClose()
        }
    }, [updateResponse])

    const onFinish = (value: any) => {
        console.log(value)
        setRequestUpdate({
            endPoint: 'https://dinhvichinhxac.online/api/device/',
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
        message.error('Submit failed!')
    }

    const handleSubmitEdit = () => {
        form.submit()
    }

    return (
        <div className={style.device_edit_container}>
            <Modal
                {...props}
                visible={visible}
                onCancel={onClose}
                title={`Cập nhật thiết bị ${data?.name}`}
                footer={<Button onClick={handleSubmitEdit}>Cập nhật</Button>}
            >
                <div className={style.device_edit_content}>
                    {!data && <Spin />}
                    {data && (
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
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
                                    <Input
                                        placeholder=""
                                        defaultValue={data.sim_imei}
                                    />
                                </Form.Item>
                            </div>
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
                                    <Input
                                        placeholder=""
                                        defaultValue={data.name}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="caster_ip" label="Caster Ip">
                                    <Input
                                        placeholder=""
                                        defaultValue={data.caster_ip}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="caster_port"
                                    label="Caster Port"
                                >
                                    <Input
                                        placeholder=""
                                        defaultValue={data.caster_port}
                                    />
                                </Form.Item>
                            </div>

                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="ntrip_username"
                                    label="Ntrip Username"
                                >
                                    <Input
                                        placeholder=""
                                        defaultValue={data.ntrip_username}
                                    />
                                </Form.Item>
                            </div>

                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="ntrip_password"
                                    label="Ntrip Password"
                                >
                                    <Input
                                        placeholder=""
                                        defaultValue={data.ntrip_password}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item
                                    name="mount_point"
                                    label="Mount Point"
                                >
                                    <Input
                                        placeholder=""
                                        defaultValue={data.mount_point}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default DeviceEditModal
