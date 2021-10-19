import { useLocation } from "react-router";

import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const HomeDashboard = ({ selectItem }: any) => {
  const location = useLocation();

  const handleSelectMenuItem = (menu: any) => {
    selectItem(menu);
    // history.push(menu.key);
  };
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
            Danh sách máy móc
          </Menu.Item>
          <Menu.Item key="menu_3_2" icon={<VideoCameraOutlined />}>
            Thiết bị vòng tua
          </Menu.Item>
          <Menu.Item key="menu_3_3" icon={<VideoCameraOutlined />}>
            Dữ liệu vòng tua
          </Menu.Item>
          <Menu.Item key="menu_3_4" icon={<VideoCameraOutlined />}>
            Dữ liệu toàn đạc
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="QUẢN LÍ NHÂN SỰ">
          <Menu.Item key="/admin/list" icon={<UserOutlined />}>
            Quản trị viên
          </Menu.Item>
          <Menu.Item key="/users/list" icon={<VideoCameraOutlined />}>
            Người dùng
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.SubMenu title="Lịch sử track">
            <Menu.Item key="/fields/list" icon={<VideoCameraOutlined />}>
              List
            </Menu.Item>
            <Menu.Item key="/fields/card" icon={<VideoCameraOutlined />}>
              Cards
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default HomeDashboard;
