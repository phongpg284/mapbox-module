import { useLocation } from 'react-router'

import { Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../app/store'

import ProjectsIcon from '../MenuIcons/ProjectsIcon'

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
                    <Menu.Item className="function-menu-item" key="/" icon={<UserOutlined />}>
                        Trang chủ
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/settings" icon={<VideoCameraOutlined />}>
                        Cài đặt
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup className="function-menu-title" title="QUẢN LÍ DỰ ÁN">
                    <Menu.Item className="function-menu-item" key="/projects/list" icon={<ProjectsIcon/>} >
                        Dự án
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/reports" icon={<VideoCameraOutlined />}>
                        Báo cáo
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup className="function-menu-title" title="QUẢN LÍ THIẾT BỊ">
                    <Menu.Item className="function-menu-item" key="/active-devices/list" icon={<UserOutlined />}>
                        Thiết bị hoạt động
                    </Menu.Item>
                    <Menu.Item className="function-menu-item" key="/devices/list" icon={<UserOutlined />}>
                        Danh sách thiết bị
                    </Menu.Item>
                    <Menu.Item
                        className="function-menu-item"
                        key="/machines/list"
                        icon={<VideoCameraOutlined />}
                    >
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
                                icon={<VideoCameraOutlined />}
                            >
                                Người dùng
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup>
                            <Menu.SubMenu title="Lịch sử track">
                                <Menu.Item
                                    key="/fields/list"
                                    icon={<VideoCameraOutlined />}
                                >
                                    List
                                </Menu.Item>
                                <Menu.Item
                                    key="/fields/card"
                                    icon={<VideoCameraOutlined />}
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
