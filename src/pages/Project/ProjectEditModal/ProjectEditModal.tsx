import style from './index.module.scss'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, FormInstance, message, Spin } from 'antd'

import useFetch from '../../../hooks/useFetch'
import { ENDPOINT_URL } from '../../../app/config'
import AddModal from '../../../components/AddModal'
interface IProjectEditModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProjectEditModal: React.FC<IProjectEditModal> = ({ id, onClose, visible, update, ...props }) => {
    const [form] = Form.useForm()

    const [data, setData] = useState<any>()
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/project/',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                requestBody: {
                    action: 'read',
                    pk: id,
                },
            })
    }, [visible])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            setData(response.data)
            form.setFieldsValue(response.data)
        }
    }, [response])

    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch({} as any)

    useEffect(() => {
        if (!isFetchingUpdate && updateResponse?.data && !updateResponse.hasError) {
            update()
            message.success(updateResponse.data)
            onClose()
        }
    }, [updateResponse])

    const onFinish = (value: any) => {
        setRequestUpdate({
            endPoint: ENDPOINT_URL + '/project/',
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
        <div className={style.project_edit_container}>
            <AddModal {...props} visible={visible} onCancel={onClose} title={`Cập nhật dự án ${data?.name}`} footer={<Button onClick={handleSubmitEdit}>Cập nhật</Button>}>
                <div className={style.project_edit_content}>
                    {isFetching && <Spin />}
                    {data && (
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                                <Form.Item name="description" label="Mô tả tổng quan">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="start_time" label="Thời gian bắt đầu">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>

                            <div style={{ overflow: 'hidden' }}>
                                <Form.Item name="end_time" label="Thời gian kết thúc">
                                    <Input placeholder="" />
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                </div>
            </AddModal>
        </div>
    )
}

export default ProjectEditModal
