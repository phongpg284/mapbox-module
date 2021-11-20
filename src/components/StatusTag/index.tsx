import { GoPrimitiveDot } from 'react-icons/go'
import './index.scss'
const StatusTag = ({ status }: any) => {
    return (
        <>
            {!status && (
                <div className="status-tag">
                    <GoPrimitiveDot />
                    <div>Không hoạt động</div>
                </div>
            )}
            {status && (
                <div className="status-tag-active">
                    <GoPrimitiveDot />
                    <div>Đang hoạt động</div>
                </div>
            )}
        </>
    )
}

export default StatusTag
