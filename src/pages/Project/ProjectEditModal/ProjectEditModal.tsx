import style from './index.module.scss'
import { Button, Modal, Table, Form, Input, FormInstance, message } from 'antd'
import useFetch from '../../../hooks/useFetch'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { keyBy } from 'lodash'
import { fixedData } from '../ProjectList/columns'

const column = [
    {
        key: 'ckey',
        dataIndex: 'ckey',
        render: (text: string) => (
            <h6 style={{ fontWeight: 'bold' }}>{text}</h6>
        ),
    },
    {
        key: 'value',
        dataIndex: 'value',
        editable: true,
    },
]

const IKeyCode = {
    code: {
        brand: 'Mã dự án',
        type: 'string',
    },
    name: {
        brand: 'Tên dự án',
        type: 'string',
    },
    description: {
        brand: 'Mô tả tổng quan',
        type: 'string',
    },
    manager: {
        brand: 'Quản lí',
        type: 'string',
    },
    create_time: {
        brand: 'Thời gian tạo',
        type: 'date',
    },
    update_time: {
        brand: 'Thời gian cập nhật',
        type: 'date',
    },
    start_time: {
        brand: 'Thời gian bắt đầu',
        type: 'date',
    },
    end_time: {
        brand: 'Thời gian kết thúc',
        type: 'date',
    },
}

const EditableContext = createContext<FormInstance<any> | null>(null)

interface Item {
    code: string
    description: string
    name: string
}

interface EditableRowProps {
    index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

interface EditableCellProps {
    title: React.ReactNode
    editable: boolean
    children: React.ReactNode
    dataIndex: keyof Item
    record: Item
    handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef<Input>(null)
    const form = useContext(EditableContext)!

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus()
        }
    }, [editing])

    const toggleEdit = () => {
        setEditing(!editing)
        form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }

    const save = async () => {
        try {
            const values = await form.validateFields()
            toggleEdit()
            handleSave({ ...record, ...values })
        } catch (errInfo) {
            console.log('Save failed:', errInfo)
        }
    }

    let childNode = children

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24, height: '30px' }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        )
    }

    return <td {...restProps}>{childNode}</td>
}

interface DataType {
    ckey: string
    value: string
}

interface IProjectEditModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    update: () => void
    id: number
}

const ProjectEditModal: React.FC<IProjectEditModal> = ({
    id,
    onClose,
    visible,
    update,
    ...props
}) => {
    const [data, setData] = useState<any>()
    const [dataSource, setDataSource] = useState<any>()
    const [response, iseFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: 'https://dinhvichinhxac.online/api/project/',
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
        if (!iseFetching && response && response.data && !response.hasError) {
            setData(response.data)
        }
    }, [response])

    useEffect(() => {
        const convertDataSource = []
        if (data) {
            const initData = fixedData
            const modifyData = Object.assign(initData, data)
            for (const [key, value] of Object.entries(modifyData)) {
                if ((IKeyCode as any)[key]) {
                    const { brand, type } = (IKeyCode as any)[key]
                    const pushData = {
                        ckey: brand,
                        value: value,
                    }
                    if (type === 'date')
                        pushData.value = new Date(value as any).toLocaleString()
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    }

    const columns = column.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: DataType) => {
                if (record.ckey === "Thời gian tạo" || record.ckey === "Thời gian cập nhật") {
                    return {
                        record,
                        editable: false,
                        dataIndex: col.dataIndex,
                        title: col.dataIndex,
                        handleSave: handleSave,
                    }
                        
                }
                return {
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.dataIndex,
                    handleSave: handleSave,
                }
            },
        }
    })

    const handleSave = (row: DataType) => {
        const newData = [...dataSource]
        const index = newData.findIndex((item: any) => row.ckey === item.ckey)
        const item = newData[index]

        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        setDataSource(newData)
    }

    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch(
        {} as any
    )
    const handleSubmitEdit = () => {
        let convertDataSource: any = {}
        if (dataSource) {
            for (const item of dataSource) {
                for (const [key, value] of Object.entries(IKeyCode)) {
                    if (item.ckey === value.brand) {
                        (convertDataSource as any)[key] = item.value
                    }
                }
            }
        }

        delete convertDataSource.start_time
        delete convertDataSource.end_time
        delete convertDataSource.create_time
        delete convertDataSource.update_time

        setRequestUpdate({
            endPoint: 'https://dinhvichinhxac.online/api/project/',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            requestBody: {
                ...convertDataSource,
                pk: id,
                action: 'update',
            },
        })
    }

    useEffect(() => {
        if (
            !isFetchingUpdate &&
            updateResponse?.data &&
            !updateResponse.hasError
        ) {
            message.success(updateResponse.data)
            update()
        }
        onClose()
    }, [updateResponse])

    return (
        <div className={style.project_edit_container}>
            <Modal
                {...props}
                visible={visible}
                onCancel={onClose}
                title={`Dự án ${data?.name}`}
                footer={<Button onClick={handleSubmitEdit}>Cập nhật</Button>}
            >
                <div className={style.project_edit_content}>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        className={style.project_table_content}
                        columns={columns}
                        dataSource={dataSource}
                        showHeader={false}
                        pagination={false}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ProjectEditModal
