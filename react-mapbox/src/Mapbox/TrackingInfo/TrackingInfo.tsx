import "./index.css"
const TrackingInfo = ({statisticData}: any) => {
    return (
        <div className="statistic">
            {statisticData && statisticData.map((device: any) => 
                (
                    <div className="block-test" key={device.name}>
                        <div>Name: {device.name}</div>
                        <div>Icon: {device.icon}</div>
                        <div>Distance: {device.distance} km</div>
                    </div>
                ))}
        </div>
    )
}

export default TrackingInfo;