import { Form, Input, message, Button, Space, Modal } from 'antd'

interface IModal {
    centered?: boolean;
    width?: number;
    visible: boolean;
    onClose: () => void;
}

const ProjectAddModal: React.FC<IModal> = ({ onClose, ...props }) => {
    const [form] = Form.useForm()

    const addNewProject = async (value: any) => {
        const query = {
            ...value,
            action: 'create',
        }
        const res = await fetch('https://dinhvichinhxac.online/api/project/', {
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
        console.log(value)
        addNewProject(value).then((data) => {
            message.success(data.response)
        })
        onClose();
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    const handleAddNewProject = () => {
        form.submit()
    }

    return (
        <Modal
            {...props}
            onCancel={onClose}
            title="Thêm dự án"
            footer={<Button onClick={handleAddNewProject}>Đăng ký</Button>}
        >
            <div className="project-add-container">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="code"
                            label="Mã dự án"
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
                            name="name"
                            label="Tên dự án"
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
                        <Form.Item name="description" label="Mô tả tổng quan">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item name="manager" label="Quản lí">
                            <Input placeholder="" />
                        </Form.Item>
                    </div>

                    {/* <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Space>
                    </Form.Item> */}
                </Form>
                <div className="project-add-item"></div>
            </div>
        </Modal>
    )
}

export default ProjectAddModal
