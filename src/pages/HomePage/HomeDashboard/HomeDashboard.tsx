import { useLocation } from 'react-router'

import { useAppSelector } from '../../../app/store'


const HomeDashboard = ({ selectItem }: any) => {
    const account = useAppSelector((state) => state.account)
    const location = useLocation()

    const handleSelectMenuItem = (menu: any) => {
        selectItem(menu)
        // history.push(menu.key);
    }
    return (
        <div className="home-dashboard">
            <ul className="function-menu">
                <li className="function-menu-group">
                    <div className="group-title">Quản lý dự án</div>
                    <ul className="group-list">
                        <li className="group-item">
                            <div className="item-icon projects"></div>
                            <div className="item-title">Dự án</div>
                        </li>
                        <li className="group-item">
                            <div className="item-icon reports"></div>
                            <div className="item-title">Báo cáo</div>
                        </li>
                    </ul>
                </li>
                <li className="function-menu-group">
                    <div className="group-title">Quản lý thiết bị</div>
                    <ul className="group-list">
                        <li className="group-item">
                            <div className="item-icon active-devices"></div>
                            <div className="item-title">Thiết bị hoạt động</div>
                        </li>
                        <li className="group-item">
                            <div className="item-icon devices-list"></div>
                            <div className="item-title">Danh sách thiết bị</div>
                        </li>
                        <li className="group-item">
                            <div className="item-icon machine-list"></div>
                            <div className="item-title">Danh sách máy móc</div>
                        </li>
                    </ul>
                </li>
                <li className="function-menu-group">
                    <div className="group-title">Quản lý nhân sự</div>
                    <ul className="group-list">
                        <li className="group-item">
                            <div className="item-icon admins"></div>
                            <div className="item-title">Quản trị viên</div>
                        </li>
                        <li className="group-item">
                            <div className="item-icon users"></div>
                            <div className="item-title">Người dùng</div>
                        </li>
                    </ul>
                </li>
                <li className="function-menu-group">
                    <div className="group-title">Lịch sử track</div>
                    <ul className="group-list">
                        <li className="group-item">
                            <div className="item-icon lists"></div>
                            <div className="item-title">Lists</div>
                        </li>
                        <li className="group-item">
                            <div className="item-icon cards"></div>
                            <div className="item-title">Cards</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default HomeDashboard
