import { Button, Form, Input, message, Modal } from 'antd'
import { ENDPOINT_URL } from '../../../app/config'
import AddModal from '../../../components/AddModal'

interface IModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
}

const DeviceAddModal: React.FC<IModal> = ({ update, onClose, ...props }) => {
    const [form] = Form.useForm()

    const addNewDevice = async (value: any) => {
        const query = {
            ...value,
            action: 'create',
        }
        const res = await fetch(ENDPOINT_URL + '/device/', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await res.json()
        return result
    }

    const onFinish = (value: any) => {
        addNewDevice(value).then((data) => {
            update()
            message.success(data.response)
            onClose()
        })
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    const handleAddNewDevice = () => {
        form.submit()
    }

    return (
        <AddModal {...props} onCancel={onClose} width={600} title="Thêm thiết bị mới" footer={<Button onClick={handleAddNewDevice}>Đăng ký</Button>}>
            <div className="device-add-container">
                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="name"
                            label="Tên thiết bị"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Input placeholder="Tên thiết bị" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="sim_imei"
                            label="Mã Sim IMEI"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Input placeholder="Mã Sim Imei của thiết bị" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="caster_ip" label="Caster IP">
                            <Input placeholder="Caster IP" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="caster_port" label="Caster Port">
                            <Input placeholder="Caster Port" />
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="ntrip_username" label="Ntrip Username">
                            <Input placeholder="Ntrip Username" />
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="ntrip_pass" label="Ntrip Password">
                            <Input placeholder="Ntrip Password" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="mount_point" label="Mount Point">
                            <Input placeholder="Mount Point" />
                        </Form.Item>
                    </div>
                </Form>
                <div className="device-add-item"></div>
            </div>
        </AddModal>
    )
}

export default DeviceAddModal
