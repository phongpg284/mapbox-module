import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Input, Form, message, Spin, Row, Col } from 'antd'

import useFetch from '../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../app/config'
import { useAppSelector } from '../../../app/store'

interface IProfileEdit {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProfileEdit: React.FC<IProfileEdit> = () => {
    const { id } = useAppSelector((state) => state.account)
    const [form] = Form.useForm()

    const [data, setData] = useState<any>()
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        setRequest({
            endPoint: ENDPOINT_URL + '/user/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                action: 'read',
                pk: id,
            },
        })
    }, [])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data[0])
            form.setFieldsValue(response.data[0])
        }
    }, [response])

    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch({} as any)

    useEffect(() => {
        if (!isFetchingUpdate && updateResponse?.data && !updateResponse.hasError) {
            message.success(updateResponse?.data?.detail)
        }
    }, [updateResponse])

    const onFinish = (value: any) => {
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/user/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                ...value,
                pk: id,
                action: 'update',
            },
        })
    }

    const onFinishFailed = () => {
        message.error('Lỗi cập nhật!')
    }

    const handleSubmitEdit = () => {
        form.submit()
    }

    return (
        <div className={style.profile_edit_container}>
            <div className={style.profile_edit_title}>Cập nhật thông tin</div>
            <div className={style.profile_edit_avatar}>
                <img src="https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png" alt="avatar" />
            </div>
            <div>
                <div className={style.profile_edit_content}>
                    {isFetching && <Spin />}
                    {data && (
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                                    name="username"
                                    label="Tên đăng nhập"
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
                                <Form.Item name="password" label="Mật khẩu">
                                    <Input placeholder="" />
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

                            <Row>
                                <Col span={12}>
                                    <Form.Item name="role" label="Chức vụ">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={11}>
                                    <Form.Item name="department" label="Phòng ban">
                                        <Input placeholder="" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    <div className={style.submit_button}>
                        <button onClick={handleSubmitEdit}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEdit
