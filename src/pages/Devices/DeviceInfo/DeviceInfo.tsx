import { Menu } from "antd";
import { useState } from "react";
import DeviceDetail from "./DeviceDetail";

const DeviceInfo = () => {
  const [selectTab, setSelectTab] = useState("info");
  const handleClick = (menu: any) => {
    setSelectTab(menu.key);
  };
  return (
    <div className="device-info-wrapper">
      <div className="device-info-title">
        <div className="device-info-container">
          <div className="device-info-navbar">
            <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
              <Menu.Item key="info">Thông tin chung</Menu.Item>
              <Menu.Item key="daily-report">Báo cáo hàng ngày</Menu.Item>
              <Menu.Item key="maintain-history">Lịch sử bảo dưỡng</Menu.Item>
              <Menu.Item key="repair-history">Lịch sử sửa chữa</Menu.Item>
              <Menu.Item key="session-history">Lịch sử điều động</Menu.Item>
            </Menu>
          </div>
          <div className="device-info-details">
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceInfo;
