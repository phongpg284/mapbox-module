import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import EcoIcon from "@material-ui/icons/Eco";
import RoomIcon from "@material-ui/icons/Room";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

const Dashboard = ({ selectItem, handleSelectMenuItem }: any) => {
  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      theme="light"
      mode="inline"
      onSelect={handleSelectMenuItem}
      selectedKeys={[selectItem]}
    >
      <SubMenu key="sub1" icon={<EcoIcon className="me-4" />} title="Crop">
        <Menu.Item key="/crop/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>
      
      <SubMenu key="sub2" icon={<RoomIcon className="me-4" />} title="Field">
        <Menu.Item key="/field/create">
          <AddIcon className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/field/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/field/card">
          <ViewModuleIcon className="me-3" />
          Card Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub3" icon={<RoomIcon className="me-4" />} title="Task Records">
        <Menu.Item key="/task/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/task/card">
          <ViewModuleIcon className="me-3" />
          Calendar Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub4" icon={<RoomIcon className="me-4" />} title="Guidance Line">
        <Menu.Item key="/guidance/create">
          <AddIcon className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/guidance/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub5" icon={<RoomIcon className="me-4" />} title="Soil Moisture">
        <Menu.Item key="/soil-moisture/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub6" icon={<RoomIcon className="me-4" />} title="Tracking">       
        <Menu.Item key="/record">
          <ViewModuleIcon className="me-3" />
          Record
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Dashboard;
