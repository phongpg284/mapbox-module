import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useHistory } from "react-router";
const HomeDashboard = ({ selectedMenuKey }: any) => {
  const history = useHistory();
  const handleSelectMenuItem = (menu: any) => {
    history.push(menu.key);
  };
  return (
    <div className="logo">
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectedMenuKey}
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
          <Menu.Item key="/projects" icon={<UserOutlined />}>
            Dự án
          </Menu.Item>
          <Menu.Item key="/reports" icon={<VideoCameraOutlined />}>
            Báo cáo
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="QUẢN LÍ THIẾT BỊ">
          <Menu.Item key="/devices" icon={<UserOutlined />}>
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
          <Menu.Item key="/admin" icon={<UserOutlined />}>
            Quản trị viên
          </Menu.Item>
          <Menu.Item key="/users" icon={<VideoCameraOutlined />}>
            Người dùng
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.Item key="/map" icon={<VideoCameraOutlined />}>
            Mapbox
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default HomeDashboard;
