import './index.css'
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FaLeaf } from 'react-icons/fa';
import { AiOutlineAppstoreAdd, AiOutlineUnorderedList } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';

const MapDashboard = ({ selectItem, handleSelectMenuItem }: any) => {
  return (
    <Menu
      style={{ width: "100%", height: "100%" }}
      theme="light"
      mode="inline"
      onSelect={handleSelectMenuItem}
      selectedKeys={[selectItem]}
    >
      <SubMenu key="sub1" icon={<FaLeaf className="me-4" />} title="Crop">
        <Menu.Item key="/map/crop/list">
          <AiOutlineUnorderedList className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>
      
      <SubMenu key="sub2" icon={<AiOutlineUnorderedList className="me-4" />} title="Field">
        <Menu.Item key="/map/field/create">
          <IoIosAdd className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/map/field/list">
          <AiOutlineUnorderedList className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/map/field/card">
          <AiOutlineAppstoreAdd className="me-3" />
          Card Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub3" icon={<AiOutlineUnorderedList className="me-4" />} title="Task Records">
        <Menu.Item key="/map/task/list">
          <AiOutlineUnorderedList className="me-3" />
          List Display
        </Menu.Item>
        <Menu.Item key="/map/task/card">
          <AiOutlineUnorderedList className="me-3" />
          Calendar Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub4" icon={<AiOutlineUnorderedList className="me-4" />} title="Guidance Line">
        <Menu.Item key="/map/guidance/create">
          <IoIosAdd className="me-3" />
          New Registration
        </Menu.Item>
        <Menu.Item key="/map/guidance/list">
          <AiOutlineUnorderedList className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub5" icon={<AiOutlineUnorderedList className="me-4" />} title="Soil Moisture">
        <Menu.Item key="/map/soil-moisture/list">
          <AiOutlineUnorderedList className="me-3" />
          List Display
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub6" icon={<AiOutlineUnorderedList className="me-4" />} title="Tracking">       
        <Menu.Item key="/map">
          <AiOutlineUnorderedList className="me-3" />
          Tracking
        </Menu.Item>
        <Menu.Item key="/map/record">
          <AiOutlineUnorderedList className="me-3" />
          Record
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MapDashboard;
