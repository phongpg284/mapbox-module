import { Form, Input, message, Button, Space } from 'antd'

const ProjectAdd = () => {
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
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    return (
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

                <div style={{ overflow: 'hidden' }}>
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
                </div>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <div className="project-add-item"></div>
        </div>
    )
}

export default ProjectAdd
