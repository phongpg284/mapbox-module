import './index.css'
import imetLogo from '../../assets/imet-logo.png'

import { useHistory } from 'react-router'
import { Form, Button } from 'antd'

import { useAppDispatch } from '../../app/store'
import { updateToken } from '../../app/authSlice'
import { ENDPOINT_URL } from '../../app/config'


const Login = () => {
    const history = useHistory()

    const dispatch = useAppDispatch()

    const onFinish = (values: any) => {
        const query = {
            username: values.username,
            password: values.password,
        }
        fetch(ENDPOINT_URL + '/login/', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { token, id, role } = data
                dispatch(
                    updateToken({
                        accessToken: token,
                        id: id,
                        role: role,
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
            <div className="login-intro">
                <div className="login-theme"></div>
                <div className="intro-info">
                    <img src={imetLogo} alt="" className="intro-logo" />
                    <div className="intro-title">WELCOME TO iMET</div>
                    <div className="intro-description">The best construction vehicles tracking-app</div>
                    <div className="intro-description">you can find!</div>
                </div>
            </div>
            <div className="login-container">
                <div className="login-title">LOG IN TO iMET</div>
                
                <Form
                    className="login-form"
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
                        <input type="text" className="login-form-input input-username" placeholder="Username" />
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
                        <input type="password" className="login-form-input input-password" placeholder="Password" />
                    </Form.Item>

                    {/* <Form.Item
                        className="login-form-checkbox"
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item 
                        // wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button className="login-form-button" type="primary" htmlType="submit">
                            LOG IN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
