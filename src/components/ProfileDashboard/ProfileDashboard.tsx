import { Divider, Menu, Switch } from 'antd'
import PeopleIcon from '@material-ui/icons/People'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import InputIcon from '@material-ui/icons/Input'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { updateToken } from '../../app/authSlice'
import { ENDPOINT_URL } from '../../app/config'
const ProfileDashboard = () => {
    const history = useHistory()
    const account = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        fetch(ENDPOINT_URL + '/logout/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${account.accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                dispatch(
                    updateToken({
                        accessToken: '',
                    })
                )
            })
            .catch((err) => console.log(err))
        history.push('/')
    }
    return (
        <div>
            <Menu
                style={{ width: '100%', height: '100%' }}
                theme="light"
                mode="inline"
                //   onSelect={handleSelectMenuItem}
                //   selectedKeys={[selectItem]}
            >
                <div className="d-flex justify-content-start align-items-center px-3 mt-3">
                    <img
                        alt="no?"
                        src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
                        style={{ height: '35px' }}
                        className="me-3"
                    />
                    <div className="">
                        <div className=" mb-3 mt-1 pb-3 fs-6 fw-bold">
                            Phong Phi Gia
                        </div>
                        <div className="d-flex align-items-center m-2">
                            <div className="me-2">
                                <Switch />
                            </div>
                            <div className="fs-6">Dark Mode</div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="">
                    <Menu.ItemGroup title="ACCOUNT">
                        <Menu.Item key="/user/settings">
                            <PersonIcon className="me-3" />
                            User Settings
                        </Menu.Item>
                        <Menu.Item key="/user/password">
                            <LockIcon className="me-3" />
                            Create Password
                        </Menu.Item>
                        <Menu.Item key="/user/manage">
                            <CreditCardIcon className="me-3" />
                            Management of your plans
                        </Menu.Item>
                    </Menu.ItemGroup>
                </div>
                <Divider />
                <div>
                    <Menu.ItemGroup title="CONNECTIONS">
                        <Menu.Item key="/connections">
                            <PeopleIcon className="me-3" />
                            Connection
                        </Menu.Item>
                        <Menu.Item key="/connections/card">
                            <PersonAddIcon className="me-3" />
                            Follow Request
                        </Menu.Item>
                    </Menu.ItemGroup>
                </div>
                <Divider />
                <Menu.Item key="/logout" onClick={handleLogout}>
                    <InputIcon className="me-3" />
                    Log out
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default ProfileDashboard
