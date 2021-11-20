import { Button, Form, Input, message, Select } from 'antd'
import { ENDPOINT_URL } from '../../../app/config'
import AddModal from '../../../components/AddModal'
const { Option } = Select

interface IModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
}

const UserAddModal: React.FC<IModal> = ({ update, onClose, ...props }) => {
    const [form] = Form.useForm()
    const onRoleChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' })
                return
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' })
                return
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' })
        }
    }
    const addNewUser = async (value: any) => {
        const query = {
            ...value,
            action: 'create',
        }
        const res = await fetch(ENDPOINT_URL + '/user/', {
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
        addNewUser(value).then((data) => {
            update()
            message.success(data.detail)
            onClose()
        })
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    const handleAddNewUser = () => {
        form.submit()
    }

    return (
        <AddModal {...props} onCancel={onClose} width={600} title="Đăng kí người dùng mới" footer={<Button onClick={handleAddNewUser}>Đăng ký</Button>}>
            <div className="user-add-container">
                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                            name="username"
                            label="Tên đăng nhập"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="name"
                            label="Họ tên"
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
                            name="role"
                            label="Chức vụ"
                            rules={[
                                { required: true },
                                //@ts-ignore
                                { type: 'string', warningOnly: true },
                            ]}
                        >
                            <Select placeholder="Chọn chức vụ" allowClear>
                                <Option value="user">user</Option>
                                <Option value="driver">driver</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="phone" label="Số điện thoại">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="address" label="Địa chỉ">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </AddModal>
    )
}

export default UserAddModal
