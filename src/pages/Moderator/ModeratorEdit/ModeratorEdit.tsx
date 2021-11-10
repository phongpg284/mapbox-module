import style from './index.module.scss'
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { Button, Input, Table, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'

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

const EditableContext = createContext<FormInstance<any> | null>(null)

interface Item {
    key: string
    name: string
    age: string
    address: string
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
                style={{ paddingRight: 24 }}
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
    key: React.Key
    name: string
    age: string
    address: string
}

interface EditableTableState {
    dataSource: DataType[]
    count: number
}

const ModeratorEdit = ({ id }: any) => {
    // const [dataSource, setDataSource] = useState<any>([])
    // useEffect(() => {
    //     setDataSource(fakeDataSource)
    // }, [])
    const [dataSource, setDataSource] = useState<any[]>([])
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
            const convertDataSource = [];
            for (const [key, value] of Object.entries(response.data[0])) {
                convertDataSource.push({
                    ckey: key,
                    value: value
                })    
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
        const index = newData.findIndex((item: any) => row.key === item.key)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        setDataSource(newData)
    }

    const handleSubmitEdit = () => {
        console.log(dataSource)
        // TODO: call update api
    }

    return (
        <div className={style.moderator_edit_container}>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                className={style.moderator_table_content}
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
                        style={{ float: 'left' }}
                        onClick={handleSubmitEdit}
                    >
                        Cập nhật thông tin
                    </Button>
                )}
            />
            <img
                alt="avatar"
                src="https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg"
            ></img>
        </div>
    )
}

export default ModeratorEdit
