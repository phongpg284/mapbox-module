import style from './index.module.scss'
import { Button, Table } from 'antd'
import faker from 'faker'
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

const data = [
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

const UserDetail = ({ id }: any) => {
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
    return (
        <div className={style.user_detail_container}>
            <Table
                className={style.user_table_content}
                columns={column}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
                title={() => (
                    <h4 style={{ textAlign: 'left' }}>Chi tiết: name</h4>
                )}
                footer={() => (
                    <Button
                        danger
                        style={{ float: 'left' }}
                        onClick={() => history.push('/users/edit/' + id )}
                    >
                        Cập nhật thông tin
                    </Button>
                )}
                loading={isFetching}
            />
            <img
                alt="avatar"
                src="https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg"
            ></img>
        </div>
    )
}

export default UserDetail
