import style from './index.module.scss'
import { Button, Modal, Table } from 'antd'
import useFetch from '../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { ENDPOINT_URL } from '../../../app/config'

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
    sim_imei: {
        brand: 'Sim Imei',
        type: 'string',
    },
    name: {
        brand: 'Tên thiết bị',
        type: 'string',
    },
	caster_ip: {
        brand: 'Caster Ip',
        type: 'string',
    },
    caster_port: {
        brand: 'Caster Port',
        type: 'string',
    },
    ntrip_username: {
        brand: 'Ntrip Username',
        type: 'string',
    },
    ntrip_password: {
        brand: 'Ntrip Password',
        type: 'string',
    },
    mount_point: {
        brand: 'Mount Point',
        type: 'string',
    },
}

interface ISummaryDeviceModal {
    centered?: boolean
    width?: number
    visible: boolean
    onClose: () => void
    id: number
}

const DeviceSummaryModal: React.FC<ISummaryDeviceModal> = ({
    id,
    onClose,
    visible,
    ...props
}) => {
    const [data, setData] = useState<any>()
    const [dataSource, setDataSource] = useState<any>()
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        if (visible)
            setRequest({
                endPoint: ENDPOINT_URL + '/device/',
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
        }
    }, [response])

    useEffect(() => {
        const convertDataSource = []
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                if ((IKeyCode as any)[key]) {
					const {brand, type} = (IKeyCode as any)[key]
                    const pushData = {
                        ckey:  brand,
                        value: value,
                    }
					if(type === "date")
					pushData.value = new Date(value as any).toLocaleString() 
                    convertDataSource.push(pushData)
                }
            }
        }
        setDataSource(convertDataSource)
    }, [data])

    return (
        <div className={style.device_summary_container}>
            <Modal
                {...props}
                visible={visible}
                onCancel={onClose}
                title={`Thiết bị ${data?.name}`}
                footer={<Button onClick={onClose}>Đóng</Button>}
            >
                <div className={style.device_summary_content}>
                    <Table
                        className={style.device_table_content}
                        columns={column}
                        dataSource={dataSource}
                        showHeader={false}
                        pagination={false}
                        loading={isFetching}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default DeviceSummaryModal
