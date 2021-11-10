import style from './index.module.scss'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Button, Input, Table, Form, message, FormInstance } from 'antd'

import useFetch from '../../../hooks/useFetch'

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
    name: {
        brand: 'Tên người dùng',
        type: 'string',
    },
    username: {
        brand: 'Tên đăng nhập',
        type: 'string',
    },
    password: {
        brand: 'Mật khẩu',
        type: 'string',
    },
    email: {
        brand: 'Email',
        type: 'string',
    },
    phone: {
        brand: 'Số điện thoại',
        type: 'string',
    },
    role: {
        brand: 'Chức vụ',
        type: 'string',
    },
    department: {
        brand: 'Phòng ban',
        type: 'string',
    },
}

const EditableContext = createContext<FormInstance<any> | null>(null)

interface Item {
    name: string
    username: string
    password: string
    role: string
    email: string
    department: string
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

type EditableTableProps = Parameters<typeof Table>[0]

interface DataType {
    ckey: string
    value: string
}

interface EditableTableState {
    dataSource: DataType[]
    count: number
}

const UserEdit = ({ match }: any) => {
    const id = match?.params?.id
    // const [dataSource, setDataSource] = useState<any>([])
    // useEffect(() => {
    //     setDataSource(fakeDataSource)
    // }, [])
    const [dataSource, setDataSource] = useState<any>([])
    const [response, isFetching, setRequest] = useFetch({} as any)
    useEffect(() => {
        setRequest({
            endPoint: 'https://dinhvichinhxac.online/api/user/',
            method: 'POST',
            requestBody: {
                action: 'read',
                pk: id,
            },
            headers: {
                'Content-type': 'application/json',
            },
        })
    }, [])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            const convertDataSource = []
            if (response.data[0]) {
                for (const [key, value] of Object.entries(response.data[0])) {
                    if ((IKeyCode as any)[key]) {
                        const { brand, type } = (IKeyCode as any)[key]
                        const pushData = {
                            ckey: brand,
                            value: value,
                        }
                        if (type === 'date')
                            pushData.value = new Date(
                                value as any
                            ).toLocaleString()
                        convertDataSource.push(pushData)
                    }
                }
            }
            setDataSource(convertDataSource)
        }
    }, [response])

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
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.dataIndex,
                handleSave: handleSave,
            }),
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
                        ;(convertDataSource as any)[key] = item.value
                    }
                }
            }
        }
        delete convertDataSource.username

        setRequestUpdate({
            endPoint: 'https://dinhvichinhxac.online/api/user/',
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
            updateResponse &&
            updateResponse.data &&
            !updateResponse.hasError
        ) {
            message.success(updateResponse.data?.detail)
        }
    }, [updateResponse])

    return (
        <div className={style.user_edit_container}>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                className={style.user_table_content}
                columns={columns}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
                title={() => (
                    <h4 style={{ textAlign: 'left' }}>Chỉnh sửa: name</h4>
                )}
                footer={() => (
                    <Button
                        danger
                        style={{ display: 'flex' }}
                        onClick={handleSubmitEdit}
                    >
                        Cập nhật thông tin
                    </Button>
                )}
            />
            <div className={style.user_avatar}>
                <img
                    alt="avatar"
                    src="https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg"
                ></img>
            </div>
        </div>
    )
}

export default UserEdit
