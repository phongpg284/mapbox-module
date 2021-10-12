import "./index.css";

import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import HomeDashboard from "./HomeDashboard";
import ProjectList from "../Projects/ProjectList";
import DeviceList from "../Devices/DevicesList";
import DeviceInfo from "../Devices/DeviceInfo";

import { Drawer, Layout } from "antd";
import { Dehaze } from "@material-ui/icons";

import ProfileDashboard from "../../components/ProfileDashboard";
import FieldPage from "../../components/Map/FieldPage";
import FieldList from "../../components/Map/FieldPage/FieldList";
import FieldCard from "../../components/Map/FieldPage/FieldCard";
import BoundingMap from "../../components/Map/BoundingMap";
import RecordMap from "../../components/Map/RecordMap";
import ProjectSummary from "../../components/Project/ProjectSummary";
import ProjectDetail from "../../components/Project/ProjectDetail";

const { Header, Content } = Layout;

const HomePage = ({ parentPath }: any) => {
  const history = useHistory();

  const [isSideboardCollapse, setIsSideboardCollapse] = useState(false);
  const [isProfileCollapse, setIsProfileCollapse] = useState(false);
  const handleClickMenu = () => {
    setIsSideboardCollapse(!isSideboardCollapse);
  };

  const handleClickProfile = () => {
    setIsProfileCollapse(!isProfileCollapse);
  };

  const handleSelectMenuItem = (menu: any) => {
    history.push(menu.key);
    setIsSideboardCollapse(false);
  };

  return (
    <div>
      <Layout style={{ maxHeight: "100vh" }}>
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setIsSideboardCollapse(false)}
          visible={isSideboardCollapse}
          bodyStyle={{ padding: "0" }}
        >
          <HomeDashboard selectItem={handleSelectMenuItem} />
        </Drawer>

        <Drawer
          placement="right"
          closable={false}
          onClose={() => setIsProfileCollapse(false)}
          visible={isProfileCollapse}
          bodyStyle={{ padding: "0" }}
        >
          <ProfileDashboard />
        </Drawer>
        <Header
          className="header"
          style={{ height: "70px", backgroundColor: "#00a26a" }}
        >
          <div className="float-start">
            <Dehaze onClick={handleClickMenu} style={{ color: "white" }} />
          </div>
          <div className="float-end">
            <img
              alt="no?"
              src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
              className=""
              style={{ height: "40px" }}
              onClick={handleClickProfile}
            ></img>
          </div>
        </Header>
        <Content>
          <div>
            <Switch>
              <Route path={`${parentPath}devices`}>
                <DeviceList />
              </Route>
              <Route path={`${parentPath}projects`}>
                {/* <ProjectList /> */}
                <ProjectDetail />
              </Route>
              <Route path={`${parentPath}projects-summary`}>
                <ProjectSummary />
              </Route>
              <Route path={`${parentPath}fields/list`}>
                <FieldPage>
                  {(props: any) => <FieldList data={props} />}
                </FieldPage>
              </Route>
              <Route path={`${parentPath}fields/card`}>
                <FieldPage>
                  {(props: any) => <FieldCard data={props} />}
                </FieldPage>
              </Route>
              <Route path={`${parentPath}fields/:id`} render={({match}) => (
                <RecordMap match={match}/>
              )}>
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default HomePage;
