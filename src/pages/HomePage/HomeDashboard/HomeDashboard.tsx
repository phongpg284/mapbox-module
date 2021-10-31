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
        <div className="logo">
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={handleSelectMenuItem}
            >
                <Menu.ItemGroup>
                    <Menu.Item key="/" icon={<UserOutlined />}>
                        Trang chủ
                    </Menu.Item>
                    <Menu.Item key="/settings" icon={<VideoCameraOutlined />}>
                        Cài đặt
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup title="QUẢN LÍ DỰ ÁN">
                    <Menu.Item key="/projects/list" icon={<UserOutlined />}>
                        Dự án
                    </Menu.Item>
                    <Menu.Item key="/reports" icon={<VideoCameraOutlined />}>
                        Báo cáo
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="QUẢN LÍ THIẾT BỊ">
                    <Menu.Item key="/devices/list" icon={<UserOutlined />}>
                        Danh sách thiết bị
                    </Menu.Item>
                    <Menu.Item
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
                        <Menu.ItemGroup title="QUẢN LÍ NHÂN SỰ">
                            {/* <Menu.Item key="/moderators/list" icon={<UserOutlined />}>
                                Quản trị viên
                            </Menu.Item> */}
                            <Menu.Item
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
