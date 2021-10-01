import "./index.css";

import { useState } from "react";
import { Route, Switch } from "react-router";

import { Breadcrumb, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import HomeDashboard from "./HomeDashboard";
import ProjectList from "../Projects/ProjectList";
import DeviceList from "../Devices/DevicesList";

const { Header, Content, Sider } = Layout;

const HomePage = ({ parentPath }: any) => {
  console.log(parentPath);
  const [isSiderCollapse, setIsSiderCollapse] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("menu_1_1");
  return (
    <div className="home-page">
      <Header className="home-layout-header">
        <div
          className="home-layout-sider-control"
          onClick={() => setIsSiderCollapse(!isSiderCollapse)}
        >
          {isSiderCollapse && <MenuUnfoldOutlined />}
          {!isSiderCollapse && <MenuFoldOutlined />}
        </div>
      </Header>
      <Layout style={{ height: "100vh" }}>
        <Layout className="home-layout">
          <Sider trigger={null} collapsible collapsed={isSiderCollapse}>
            <HomeDashboard selectedMenuKey={selectedMenuKey} />
          </Sider>
          <Content className="home-layout-content">
            <div className="home-layout-content-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="home-layout-content-container">
              <Switch>
                <Route path={`${parentPath}devices`}>
                  <DeviceList />
                </Route>
                <Route path={`${parentPath}projects`}>
                  <ProjectList />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
