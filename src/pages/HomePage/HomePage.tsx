import './index.scss'

import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import { Drawer, Dropdown, Layout } from 'antd'

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
import RealtimeMap from '../../components/Map/RealtimeMap'
import TaskMap from '../../components/Map/TaskMap'
import { useAppSelector } from '../../app/store'

const { Header, Content } = Layout

const HomePage = ({ parentPath, match }: any) => {
    const account = useAppSelector((state) => state.account)
    const history = useHistory()
    const [isSideboardCollapse, setIsSideboardCollapse] = useState(false)
    const [isProfileCollapse, setIsProfileCollapse] = useState(false)
    const handleClickMenu = () => {
        setIsSideboardCollapse(!isSideboardCollapse)
    }

    const handleClickProfile = () => {
        setIsProfileCollapse(!isProfileCollapse)
    }

    const handleSelectMenuItem = (key: string) => {
        history.push(key)
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
                    <HomeDashboard selectItem={handleSelectMenuItem} visible={isSideboardCollapse} />
                </Drawer>

                {/* <Drawer
                    width={380}
                    className="profile-menu"
                    placement="right"
                    closable={false}
                    onClose={() => setIsProfileCollapse(false)}
                    visible={isProfileCollapse}
                    bodyStyle={{ padding: '0' }}
                >
                    <ProfileDashboard />
                </Drawer> */}
                <Header className="header">
                    <div className="menu-and-logo float-start">
                        <button className={`menu-toggle-button ${!isSideboardCollapse ? '' : 'active'}`} type="button" onClick={handleClickMenu}>
                            <div className="button-image"></div>
                        </button>
                        <button className="branch">
                            <div className="branch-logo"></div>
                            <div className="branch-name">iMET</div>
                        </button>
                        {/* <Dehaze
                            onClick={handleClickMenu}
                            style={{ color: 'white' }}
                        /> */}
                    </div>

                    {account.accessToken && account.id && account.role && (
                        <Dropdown overlay={<ProfileDashboard />} trigger={['click']} placement="bottomRight">
                            <div className={`float-end user-toggle ${!isProfileCollapse ? '' : 'active'}`} onClick={handleClickProfile}>
                                <div className="user-avatar">
                                    <div className="user-avatar-img"></div>
                                </div>
                             </div>
                        </Dropdown>
                    )}
                    
                    {!account.accessToken && !account.id && !account.role && (
                        <button onClick={() => history.push("/login")}>Đăng nhập</button>
                    )}
                </Header>
                <Content className="home-content">
                    <Switch>
                        <PrivateRoute path={`${parentPath}devices/list`} component={DeviceList} />
                        <PrivateRoute path={`${parentPath}devices/:id/tasks`} component={DeviceTask} />
                        <PrivateRoute path={`${parentPath}devices/:id`} component={DeviceInfo} />
                        <PrivateRoute path={`${parentPath}devices-summary`} component={DeviceDetail} />

                        <PrivateRoute path={`${parentPath}tasks/:id`} component={RecordMap} />
                        {/* <PrivateRoute path={`${parentPath}devices/:id`} component={DeviceInfo} /> */}

                        <PrivateRoute path={`${parentPath}active-devices`} component={ActiveDeviceList} />
                        <PrivateRoute path={`${parentPath}active-tasks/:device/:task`} component={RealtimeMap} />

                        <PrivateRoute path={`${parentPath}machines/list`} component={MachinesList} />
                        <PrivateRoute path={`${parentPath}machines/:id`} component={MachineInfo} />

                        <PrivateRoute path={`${parentPath}projects/list`} component={ProjectList} />
                        <PrivateRoute path={`${parentPath}projects/:id`} component={ProjectDetail} />

                        <PrivateRoute path={`${parentPath}users/list`} component={UserList} />
                        <PrivateRoute path={`${parentPath}users/edit/:id`} component={UserEdit} />
                        <PrivateRoute path={`${parentPath}users/:id`} component={UserDetail} />

                        <Route path={`${parentPath}moderators/list`}>
                            <ModeratorList />
                        </Route>
                        <Route path={`${parentPath}moderators/edit/:id`} render={({ match }) => <ModeratorEdit id={match.params.id} />} />
                        <Route path={`${parentPath}moderators/:id`} render={({ match }) => <ModeratorDetail id={match.params.id} />} />

                        <PrivateRoute path={`${parentPath}fields/list`}>
                            <FieldPage>{(props: any) => <FieldList data={props} />}</FieldPage>
                        </PrivateRoute>
                        <PrivateRoute path={`${parentPath}fields/card`}>
                            <FieldPage>{(props: any) => <FieldCard data={props} />}</FieldPage>
                        </PrivateRoute>
                        <PrivateRoute path={`${parentPath}fields/:id`} component={RecordMap} />
                    </Switch>
                </Content>
            </Layout>
        </div>
    )
}

export default HomePage
