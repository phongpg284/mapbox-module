import style from './index.module.scss'
import columns from './columns'
import { Button, Input, Space, Table } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProjectDeviceAddModal from './ProjectDeviceAddModal'
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai'
import useFilter from '../../../../hooks/useFilter'
import { SearchOutlined } from '@ant-design/icons'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'

const ProjectDevice = ({ id, data, refetch }: any) => {
    const history = useHistory()

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={`/devices/${record.id}`}>{text}</Link>,
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={style.control_button} onClick={() => history.push(`/devices/${record.id}`)}>
                        <AiOutlineInfoCircle />
                    </button>
                    <button className={style.control_button}>
                        <AiOutlineDelete />
                    </button>
                </Space>
            ),
        },
    ]

    const [deviceList, setDeviceList] = useState<any>([])
    useEffect(() => {
        if (data) {
            const convertDeviceList = []
            for (const { machine } of data) {
                const newDevice = {
                    id: machine.id,
                    name: machine.name,
                    create_time: machine.create_time,
                    update_time: machine.update_time,
                }
                convertDeviceList.push(newDevice)
            }
            setDeviceList(convertDeviceList)
        }
    }, [data])

    const [isShowProjectDeviceAddModal, setIsShowProjectDeviceAddModal] = useState(false)

    const handleShowProjectDeviceAddModal = () => {
        setIsShowProjectDeviceAddModal(true)
    }

    const handleHideProjectDeviceAddModal = () => {
        setIsShowProjectDeviceAddModal(false)
    }

    const [search, onChangeSearch, filterData] = useFilter(deviceList, 'name')

    return (
        <div className={style.project_devices_list_wrapper}>
            <div className={style.project_devices_list_control}>
                <div className={style.project_devices_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên máy" />
                </div>
                <div className={style.project_devices_list_control_actions}>
                    <Button onClick={handleShowProjectDeviceAddModal}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>
            <div className={style.project_devices_list_table}>
                <Table columns={tableColumns} dataSource={filterData} bordered />
            </div>
            <ProjectDeviceAddModal update={refetch} id={id} centered width={800} visible={isShowProjectDeviceAddModal} onClose={handleHideProjectDeviceAddModal} />
        </div>
    )
}

export default ProjectDevice
