import { Link } from 'react-router-dom'

import { useState } from 'react'
import togglerIcon from '../../../../assets/HomeContent/toggle.png'

const HomeHeader = () => {
    const [isToggled, setIsToggled] = useState(false);
    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    return (
        <div className="home-header">
            <nav className="navbar sticky-top navbar-expand-lg imet-navbar">
                <div className="container">
                    <a className="navbar-brand imet-branch d-flex align-items-center" href="#">
                        <div className="imet-branch-logo"></div>
                        <div className="imet-branch-name">imet</div>
                    </a>
                    <button className="d-flex d-lg-none imet-navbar-toggle justify-content-center align-items-center" type="button" onClick={handleToggle}>
                        <img src={togglerIcon} alt="" className="imet-navbar-toggle-img" />
                    </button>
                    <div className={`imet-navbar-collapse ${isToggled ? 'active' : ''} d-lg-flex justify-content-end align-items-lg-center`}>
                        <ul className="navbar-nav imet-navbar-nav mr-auto">
                            <li className="imet-navbar-nav-item nav-item">
                                <a className="imet-navbar-nav-link nav-link" href="#aboutUs">
                                    About Us
                                </a>
                            </li>
                            <li className="imet-navbar-nav-item nav-item">
                                <a className="imet-navbar-nav-link nav-link" href="#contacts">
                                    Contacts
                                </a>
                            </li>
                            <div className="imet-navbar-nav-divider"></div>
                            <li className="imet-navbar-nav-item nav-item">
                                <Link className="imet-navbar-nav-link nav-link" to="/login">
                                    Sign In
                                </Link>
                            </li>
                            <li className="imet-navbar-nav-item nav-item">
                                <Link className="imet-navbar-nav-link nav-link" to="/register">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HomeHeader
