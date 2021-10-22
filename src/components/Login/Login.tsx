import './index.css'
import { Form, Input, Button, Checkbox } from 'antd'
import { useAppDispatch } from '../../app/store'
import { updateToken } from '../../app/authSlice'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()

    const dispatch = useAppDispatch()

    const onFinish = (values: any) => {
        console.log('Success:', values)

        const query = {
            username: values.username,
            password: values.password,
        }
        fetch('https://dinhvichinhxac.online/api/login/', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const token = data?.token
                dispatch(
                    updateToken({
                        accessToken: token,
                    })
                )
                history.push('/')
            })
            .catch((err) => console.log(err))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{ span: 16 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
