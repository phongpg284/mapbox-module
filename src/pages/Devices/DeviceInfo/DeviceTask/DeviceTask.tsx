import TaskMap from '../../../../components/Map/TaskMap'

const DeviceTask = ({ id }: any) => {
    return (
        <div className="device-task">
            <TaskMap id={id} />
        </div>
    )
}

export default DeviceTask
