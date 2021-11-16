import { useLocation } from 'react-router'

import { Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
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
            <Menu
                className="function-menu"
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={handleSelectMenuItem}
            >
                <Menu.ItemGroup>
                    <Menu.Item className="function-menu-item" key="/">
                        
                        Trang chủ
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/settings">
                        Cài đặt
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup className="function-menu-title" title="QUẢN LÍ DỰ ÁN">
                    <Menu.Item className="function-menu-item" key="/projects/list"  >
                        <div className="projects-icon"></div>
                        Dự án
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/reports">
                        <div className="reports-icon"></div>
                        Báo cáo
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup className="function-menu-title" title="QUẢN LÍ THIẾT BỊ">
                    <Menu.Item className="function-menu-item" key="/active-devices/list">
                        <div className="active-devices-icon"></div>
                        Thiết bị hoạt động
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/devices/list">
                        <div className="devices-icon"></div>
                        Danh sách thiết bị
                    </Menu.Item>
                    <Menu.Item
                        className="function-menu-item"
                        key="/machines/list"
                    >
                        <div className="machines-icon"></div>
                        Danh sách máy móc
                    </Menu.Item>
                    {/* <Menu.Item key="menu_3_3" icon={<VideoCameraOutlined />}>
                        Dữ liệu vòng tua
                    </Menu.Item>
                    <Menu.Item key="menu_3_4" icon={<VideoCameraOutlined />}>
                        Dữ liệu toàn đạc
                    </Menu.Item> */}
                </Menu.ItemGroup>

                {account.role === 'moderator' && (
                    <>
                        <Menu.ItemGroup className="function-menu-title"  title="QUẢN LÍ NHÂN SỰ">
                            {/* <Menu.Item key="/moderators/list" icon={<UserOutlined />}>
                                Quản trị viên
                            </Menu.Item> */}
                            <Menu.Item
                                className="function-menu-item"
                                key="/users/list"
                            >
                                Người dùng
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup>
                            <Menu.SubMenu title="Lịch sử track">
                                <Menu.Item
                                    key="/fields/list"
                                >
                                    List
                                </Menu.Item>
                                <Menu.Item
                                    key="/fields/card"
                                >
                                    Cards
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu.ItemGroup>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default HomeDashboard
