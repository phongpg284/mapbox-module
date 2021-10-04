import { useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { Drawer } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Dehaze } from "@material-ui/icons";

import MapDashboard from "../../components/MapDashboard";
import ProfileDashboard from "../../components/ProfileDashboard";

import FieldCreate from "../../components/Map/FieldCreate";
import FieldPage from "../../components/Map/FieldPage";
import FieldList from "../../components/Map/FieldPage/FieldList";
import FieldCard from "../../components/Map/FieldPage/FieldCard";

import RealtimeMap from "../../components/Map/RealtimeMap";
import RecordMap from "../../components/Map/RecordMap";
import TrackingMap from "../../components/Map/TrackingMap";
import BoundingMap from "../../components/Map/BoundingMap";

const MapPage = ({ parentPath }: any) => {
  const location = useLocation();
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
          <MapDashboard
            selectItem={location.pathname}
            handleSelectMenuItem={handleSelectMenuItem}
          />
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
              <Route path={`${parentPath}/field/create`}>
                <FieldCreate />
              </Route>

              <Route path={`${parentPath}/fields/:id`}>
                <BoundingMap />
              </Route>

              <Route path={`${parentPath}/field/list`}>
                <FieldPage>
                  {(props: any) => <FieldList data={props} />}
                </FieldPage>
              </Route>

              <Route path={`${parentPath}/field/card`}>
                <FieldPage>
                  {(props: any) => <FieldCard data={props} />}
                </FieldPage>
              </Route>

              <Route path={`${parentPath}/realtime`}>
                <RealtimeMap />
              </Route>
              <Route path={`${parentPath}/record`}>
                <RecordMap />
              </Route>
              <Route path={`${parentPath}`}>
                <TrackingMap />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default MapPage;
