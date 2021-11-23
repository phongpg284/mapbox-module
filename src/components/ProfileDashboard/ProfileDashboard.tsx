import './index.scss'

import { useHistory } from 'react-router'

import { Divider, message } from 'antd'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { clearToken } from '../../app/authSlice'
import { ENDPOINT_URL } from '../../app/config'
import { MdLogout, MdSettings } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { BsFillPersonFill } from 'react-icons/bs'

const ProfileDashboardItem = ({ label }: any) => {
    return (
        <div className="profile-dashboard-item-wrapper">
            <div className="profile-dashboard-item-icon"></div>
            <div className="profile-dashboard-item-label">{label}</div>
            <div className="profile-dashboard-item-arrow"></div>
        </div>
    )
}

const ProfileDashboard = () => {
    const history = useHistory()
    const account = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        fetch(ENDPOINT_URL + '/logout/', {
            method: 'GET',
            headers: {
                Authorization: `Token ${account.accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                message.success('Đăng xuất thành công')
                dispatch(clearToken())
                history.push('/login')
            })
            .catch((err) => message.error(err))
    }
    return (
        <div className="profile-dashboard-wrapper">
            <div className="profile-dashboard-container">
                <div className="profile-dashboard-info">
                    <div className="profile-dashboard-info-avatar">
                        <img
                            src="data:image/png;base64,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"
                            alt="ava"
                        />
                    </div>
                    <div>
                        <div className="profile-dashboard-info-name">{account.name}</div>
                        <div className="profile-dashboard-info-role">{`(${account.role})`}</div>
                        <div className="profile-dashboard-info-modify">Chỉnh sửa hồ sơ</div>
                    </div>
                </div>
                <Divider/>
                {/* <ProfileDashboardItem label="Thông tin cá nhân" icon={<BsFillPersonFill />} /> */}
                <ProfileDashboardItem label="Cài đặt" />
                <button className="profile-dashboard-logout" onClick={handleLogout}>
                    <div className="profile-dashboard-logout-icon"></div>
                    <div className="profile-dashboard-logout-title">Đăng xuất</div>
                </button>
            </div>
        </div>
        
        // <div>
        //     <Menu
        //         style={{ width: '100%', height: '100%' }}
        //         theme="light"
        //         mode="inline"
        //         //   onSelect={handleSelectMenuItem}
        //         //   selectedKeys={[selectItem]}
        //     >
        //         <div className="d-flex justify-content-start align-items-center px-3 mt-3">
        //             <img
        //                 alt="no?"
        //                 src="https://s3-ap-northeast-1.amazonaws.com/agri-info-design-public/icons/ic_person_black_48dp.png"
        //                 style={{ height: '35px' }}
        //                 className="me-3"
        //             />
        //             <div className="">
        //                 <div className=" mb-3 mt-1 pb-3 fs-6 fw-bold">

        //                 </div>
        //             </div>
        //         </div>
        //         <Divider />
        //         <div className="">
        //             <Menu.ItemGroup title="ACCOUNT">
        //                 <Menu.Item key="/user/settings">
        //                     <PersonIcon className="me-3" />
        //                     User Settings
        //                 </Menu.Item>
        //                 <Menu.Item key="/user/password">
        //                     <LockIcon className="me-3" />
        //                     Create Password
        //                 </Menu.Item>
        //                 <Menu.Item key="/user/manage">
        //                     <CreditCardIcon className="me-3" />
        //                     Management of your plans
        //                 </Menu.Item>
        //             </Menu.ItemGroup>
        //         </div>
        //         <Divider />
        //         <div>
        //             <Menu.ItemGroup title="CONNECTIONS">
        //                 <Menu.Item key="/connections">
        //                     <PeopleIcon className="me-3" />
        //                     Connection
        //                 </Menu.Item>
        //                 <Menu.Item key="/connections/card">
        //                     <PersonAddIcon className="me-3" />
        //                     Follow Request
        //                 </Menu.Item>
        //             </Menu.ItemGroup>
        //         </div>
        //         <Divider />
        //         <Menu.Item key="/logout" onClick={handleLogout}>
        //             <InputIcon className="me-3" />
        //             Log out
        //         </Menu.Item>
        //     </Menu>
        // </div>
    )
}

export default ProfileDashboard
