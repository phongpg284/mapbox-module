import style from './index.module.scss'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Button, Input, Table, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import faker from 'faker'
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

const fakeDataSource = [
    {
        key: '1',
        ckey: 'Tên người dùng',
        value: faker.internet.userName(),
    },
    {
        key: '2',
        ckey: 'Email',
        value: faker.internet.email(),
    },
    {
        key: '3',
        ckey: 'Tên đăng nhập',
        value: faker.internet.userName(),
    },
    {
        key: '4',
        ckey: 'Số điện thoại',
        value: faker.phone.phoneNumber(),
    },
    {
        key: '5',
        ckey: 'Ngày sinh',
        value: faker.datatype.datetime().toISOString(),
    },
    {
        key: '6',
        ckey: 'Địa chỉ',
        value: faker.address.city(),
    },
    {
        key: '7',
        ckey: 'Chức vụ',
        value: faker.name.jobTitle(),
    },
    {
        key: '8',
        ckey: 'Đơn vị công tác',
        value: faker.address.country(),
    },
    {
        key: '9',
        ckey: 'Ngày đăng ký',
        value: faker.datatype.datetime().toDateString(),
    },
    {
        key: '10',
        ckey: 'Chỉnh sửa lần cuối',
        value: faker.datatype.datetime().toISOString(),
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
        console.log(dataIndex, record)
        form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }

    const save = async () => {
        try {
            const values = await form.validateFields()
            console.log("save", values)
            
            toggleEdit()
            console.log({ ...record, ...values });
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

const UserEdit = ({ id }: any) => {
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
                "Content-type": "application/json"
            }
        })
    }, [])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) {
            // setDataSource(response.data)
            const convertDataSource = [];
            let i = 0;
            for (const [key, value] of Object.entries(response.data[0])) {
                convertDataSource.push({
                    key: i,
                    ckey: key,
                    value: value
                })    
                i++;
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
        console.log(row, "hoho")
        const newData = [...dataSource]
        const index = newData.findIndex((item: any) => row.key === item.key)
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        setDataSource(newData)
    }


    const [updateResponse, isFetchingUpdate, setRequestUpdate] = useFetch({} as any); 
    const handleSubmitEdit = () => {
        console.log(dataSource)
        const body = dataSource.reduce((prev: any, curr: any) => {
            if(curr.value)
          prev[curr.ckey] = curr.value;
          return prev
        },{})
        body.pk = body.id;
        delete body.id;
        delete body.username;
        delete body.role;
        setRequestUpdate({
            endPoint: "https://dinhvichinhxac.online/api/user/",
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            requestBody: {
                ...body,
                action: "update",
            }
        })
    }

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

export default UserEdit
