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
        <Menu.Item key="/map/crop/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>
      
      <SubMenu key="sub2" icon={<RoomIcon className="me-4" />} title="Field">
        <Menu.Item key="/map/field/create">
          <AddIcon className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/map/field/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/map/field/card">
          <ViewModuleIcon className="me-3" />
          Card Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub3" icon={<RoomIcon className="me-4" />} title="Task Records">
        <Menu.Item key="/map/task/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/map/task/card">
          <ViewModuleIcon className="me-3" />
          Calendar Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub4" icon={<RoomIcon className="me-4" />} title="Guidance Line">
        <Menu.Item key="/map/guidance/create">
          <AddIcon className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/map/guidance/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub5" icon={<RoomIcon className="me-4" />} title="Soil Moisture">
        <Menu.Item key="/map/soil-moisture/list">
          <ListIcon className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub6" icon={<RoomIcon className="me-4" />} title="Tracking">       
        <Menu.Item key="/map">
          <ViewModuleIcon className="me-3" />
          Tracking
        </Menu.Item>
        <Menu.Item key="/map/record">
          <ViewModuleIcon className="me-3" />
          Record
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Dashboard;
