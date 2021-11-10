import style from './index.module.scss'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useHistory } from 'react-router'

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
    },
]

const IKeyCode = {
    name: {
        brand: 'Tên người dùng ',
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

const UserDetail = ({ match }: any) => {
    const id = match?.params?.id
    const history = useHistory()

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
    return (
        <div className={style.user_detail_container}>
            <Table
                className={style.user_table_content}
                columns={column}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
                title={() => (
                    <h4 style={{ textAlign: 'left' }}>
                        Chi tiết người dùng {response?.data?.[0]?.name}
                    </h4>
                )}
                footer={() => (
                    <Button
                        danger
                        style={{ display: 'flex' }}
                        onClick={() => history.push('/users/edit/' + id)}
                    >
                        Cập nhật thông tin
                    </Button>
                )}
                loading={isFetching}
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

export default UserDetail
