import { Form, Input, message, Button, Space } from 'antd'

const DeviceAdd = () => {
    const [form] = Form.useForm()

    const addNewDevice = async (value: any) => {
        const query = {
            ...value,
            action: 'create',            
        }
        const res = await fetch('https://dinhvichinhxac.online/api/device/', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await res.json();
        return result
    }

    const onFinish = (value: any) => {
        console.log(value)
        addNewDevice(value).then((data) => {
            message.success(data.response)
        })
    }

    const onFinishFailed = () => {
        message.error('Submit failed!')
    }

    return (
        <div className="device-add-container">
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
                        <Input placeholder="" />
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
                        <Input placeholder="" />
                    </Form.Item>
                </div>
                <div style={{ overflow: 'hidden' }}>
                    <Form.Item name="caster_ip" label="casterIp">
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
            <div className="device-add-item"></div>
        </div>
    )
}

export default DeviceAdd
