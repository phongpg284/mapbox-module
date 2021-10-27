import style from './index.module.scss'
import { Button, Table } from 'antd'
import faker from 'faker'

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

const dataSource = [
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

const ModeratorDetail = () => {
    return (
        <div className={style.moderator_detail_container}>
            <Table
                className={style.moderator_table_content}
                columns={column}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
                title={() => (
                    <h4 style={{ textAlign: 'left' }}>Chi tiết: name</h4>
                )}
                footer={() => (
                    <Button danger style={{ float: 'left' }}>
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

export default ModeratorDetail
