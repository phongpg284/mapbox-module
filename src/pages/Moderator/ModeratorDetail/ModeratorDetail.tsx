import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Table } from 'antd'

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
    },
]

const ModeratorDetail = ({ id }: any) => {
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
        <div className={style.moderator_detail_container}>
            <Table
                className={style.moderator_table_content}
                columns={column}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
                loading={isFetching}
                title={() => (
                    <h4 style={{ textAlign: 'left' }}>Chi tiết: name</h4>
                )}
                footer={() => (
                    <Button
                        danger
                        style={{ float: 'left' }}
                        onClick={() => history.push('/users/edit/' + id)}
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

export default ModeratorDetail
