import './index.scss'

import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import { Drawer, Layout } from 'antd'
import { Dehaze } from '@material-ui/icons'

import HomeDashboard from './HomeDashboard'
import ProfileDashboard from '../../components/ProfileDashboard'
import PrivateRoute from '../../components/PrivateRoute'

import FieldPage from '../../components/Map/FieldPage'
import FieldList from '../../components/Map/FieldPage/FieldList'
import FieldCard from '../../components/Map/FieldPage/FieldCard'
import RecordMap from '../../components/Map/RecordMap'

import ProjectList from '../Project/ProjectList'
import ProjectDetail from '../Project/ProjectDetail'

import DeviceList from '../Devices/DevicesList'
import DeviceDetail from '../Devices/DeviceInfo/DeviceDetail'
import DeviceTask from '../Devices/DeviceInfo/DeviceTask'
import DeviceInfo from '../Devices/DeviceInfo'

import MachinesList from '../Machine/MachinesList'
import MachineInfo from '../Machine/MachineInfo'

import UserList from '../User/UserList'
import UserDetail from '../User/UserDetail'
import UserEdit from '../User/UserEdit'

import ModeratorList from '../Moderator/ModeratorList'
import ModeratorEdit from '../Moderator/ModeratorEdit'
import ModeratorDetail from '../Moderator/ModeratorDetail'
import ActiveDeviceList from '../ActiveDevice/ActiveDeviceList'
import TrackingMap from '../../components/Map/TrackingMap'

const { Header, Content } = Layout

const HomePage = ({ parentPath }: any) => {
    const history = useHistory()

    const [isSideboardCollapse, setIsSideboardCollapse] = useState(false)
    const [isProfileCollapse, setIsProfileCollapse] = useState(false)
    const handleClickMenu = () => {
        setIsSideboardCollapse(!isSideboardCollapse)
    }

    const handleClickProfile = () => {
        setIsProfileCollapse(!isProfileCollapse)
    }

    const handleSelectMenuItem = (menu: any) => {
        history.push(menu.key)
        setIsSideboardCollapse(false)
    }

    return (
        <div>
            <Layout style={{ maxHeight: '100vh' }}>
                <Drawer
                    className="control-menu"
                    placement="left"
                    closable={false}
                    onClose={() => setIsSideboardCollapse(false)}
                    visible={isSideboardCollapse}
                    bodyStyle={{ padding: '0' }}
                >
                    <HomeDashboard selectItem={handleSelectMenuItem} />
                </Drawer>

                <Drawer
                    className="profile-menu"
                    placement="right"
                    closable={false}
                    onClose={() => setIsProfileCollapse(false)}
                    visible={isProfileCollapse}
                    bodyStyle={{ padding: '0' }}
                >
                    <ProfileDashboard />
                </Drawer>
                <Header
                    className="header"
                    style={{ height: '70px', backgroundColor: '#00a26a' }}
                >
                    <div className="float-start">
                        <Dehaze
                            onClick={handleClickMenu}
                            style={{ color: 'white' }}
                        />
                    </div>
                    <div className="float-end">
                        <img
                            alt="no?"
                            src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
                            className=""
                            style={{ height: '40px' }}
                            onClick={handleClickProfile}
                        ></img>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: '20px',
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Switch>
                        <PrivateRoute
                            path={`${parentPath}devices/list`}
                            component={DeviceList}
                        />
                        <PrivateRoute
                            path={`${parentPath}devices/:id/tasks`}
                            component={DeviceTask}
                        />
                        <PrivateRoute
                            path={`${parentPath}devices/:id`}
                            component={DeviceInfo}
                        />
                        <PrivateRoute
                            path={`${parentPath}devices-summary`}
                            component={DeviceDetail}
                        />

                        <PrivateRoute
                            path={`${parentPath}active-devices`}
                            component={ActiveDeviceList}
                        />
                        <PrivateRoute
                            path={`${parentPath}active-tasks/:id`}
                            component={TrackingMap}
                        />

                        <PrivateRoute
                            path={`${parentPath}machines/list`}
                            component={MachinesList}
                        />
                        <PrivateRoute
                            path={`${parentPath}machines/:id`}
                            component={MachineInfo}
                        />

                        <PrivateRoute
                            path={`${parentPath}projects/list`}
                            component={ProjectList}
                        />
                        <PrivateRoute
                            path={`${parentPath}projects/:id`}
                            component={ProjectDetail}
                        />

                        <PrivateRoute
                            path={`${parentPath}users/list`}
                            component={UserList}
                        />
                        <PrivateRoute
                            path={`${parentPath}users/edit/:id`}
                            component={UserEdit}
                        />
                        <PrivateRoute
                            path={`${parentPath}users/:id`}
                            component={UserDetail}
                        />

                        <Route path={`${parentPath}moderators/list`}>
                            <ModeratorList />
                        </Route>
                        <Route
                            path={`${parentPath}moderators/edit/:id`}
                            render={({ match }) => (
                                <ModeratorEdit id={match.params.id} />
                            )}
                        />
                        <Route
                            path={`${parentPath}moderators/:id`}
                            render={({ match }) => (
                                <ModeratorDetail id={match.params.id} />
                            )}
                        />

                        <PrivateRoute path={`${parentPath}fields/list`}>
                            <FieldPage>
                                {(props: any) => <FieldList data={props} />}
                            </FieldPage>
                        </PrivateRoute>
                        <PrivateRoute path={`${parentPath}fields/card`}>
                            <FieldPage>
                                {(props: any) => <FieldCard data={props} />}
                            </FieldPage>
                        </PrivateRoute>
                        <PrivateRoute
                            path={`${parentPath}fields/:id`}
                            component={RecordMap}
                        />
                    </Switch>
                </Content>
            </Layout>
        </div>
    )
}

export default HomePage
