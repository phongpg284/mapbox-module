import { Button, Form, Input, message } from 'antd'
import { ENDPOINT_URL } from '../../../app/config'
import AddModal from '../../../components/AddModal'
interface IModal {
    centered?: boolean;
    width?: number;
    visible: boolean;
    onClose: () => void;
    update: () => void
}

const MachineAddModal: React.FC<IModal> = ({onClose, update, ...props }) => {
    const [form] = Form.useForm()

    const addNewMachine = async (value: any) => {
        const query = {
            ...value,
            action: 'create',
        }
        const res = await fetch(ENDPOINT_URL + '/machine/', {
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
        addNewMachine(value).then((data) => {
            update()
            message.success(data.response)
            onClose()
        })
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    const handleAddNewMachine = () => {
        form.submit()
    }

    return (
        <AddModal
            {...props}
            title="Thêm máy mới"
            onCancel={onClose}
            width={600}
            footer={<Button onClick={handleAddNewMachine}>Đăng ký</Button>}
        >
            <div className="machine-add-container">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* <div style={{ overflow: 'hidden' }}>
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
                    </div> */}
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="name"
                            label="Tên"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Input placeholder="Tên máy" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="model" label="Kiểu máy">
                            <Input placeholder="Kiểu máy" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="description" label="Ảnh">
                            <Input placeholder="Ảnh máy" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="description" label="Mô tả">
                            <Input placeholder="Mô tả chung" />
                        </Form.Item>
                    </div>

                    {/* <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="ntrip_username" label="Ntrip Username">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="ntrip_pass" label="Ntrip Pass">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="mount_point" label="Mount Point">
                            <Input placeholder="" />
                        </Form.Item>
                    </div> */}
                </Form>
                <div className="machine-add-item"></div>
            </div>
        </AddModal>
    )
}

export default MachineAddModal
