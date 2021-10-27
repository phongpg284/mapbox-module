import { Form, Input, message, Button, Space } from 'antd'
import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'

const DeviceAdd = () => {
    const [response, isFetching, setRequest] = useFetch({} as any)
    const [form] = Form.useForm()

    const addNewDevice = (value: any) => {
        const query = {
            ...value,
            action: 'create',
        }
        setRequest({
            endPoint: 'https://dinhvichinhxac.online/api/device/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            requestBody: query,
        })        
        // const res = await fetch('https://dinhvichinhxac.online/api/device/', {
            //     method: 'POST',
        //     body: JSON.stringify(query),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
    }
    useEffect(() => {
        if (isFetching === false && response && response.data) 
            message.success(response.data)
    }, [response])
    
    const onFinish = (value: any) => {
        console.log(value)
        addNewDevice(value)
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
