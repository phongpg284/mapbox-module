import './index.scss'
import imetLogo from '../../assets/imet-logo.png'

import { Form, Input, Button } from 'antd'
import { ENDPOINT_URL } from '../../app/config'

const Register = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values)

        const query = {
            action: "create",
            username: values.username,
            password: values.password,
        }
        fetch(ENDPOINT_URL + '/user/', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className="register-pc-wrapper">
            <div className="register-pc-intro">
                <div className="register-pc-theme"></div>
                <div className="pc-intro-info">
                    <img src={imetLogo} alt="" className="pc-intro-logo" />
                    <div className="pc-intro-title">WELCOME TO iMET</div>
                    <div className="pc-intro-description">The best construction vehicles tracking-app</div>
                    <div className="pc-intro-description">you can find!</div>
                </div>
            </div>
            <div className="register-pc-container">
                <div className="register-pc-title">SIGN UP</div>
                <Form
                    className="register-pc-form"
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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                         <input type="text" className="register-pc-form-input pc-input-username" placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <input type="password" className="register-pc-form-input pc-input-password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <input type="password" className="register-pc-form-input pc-input-password" placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button className="register-pc-form-button" type="primary" htmlType="submit">
                            REGISTER
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default Register
