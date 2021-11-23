import { Link } from 'react-router-dom'

const HomeHeader = () => {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg imet-navbar">
                <div className="container">
                    <a className="navbar-brand imet-branch d-flex align-items-center" href="#">
                        <div className="imet-branch-logo"></div>
                        <div className="imet-branch-name">imet</div>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse imet-navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
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
                            <li className="imet-navbar-nav-item nav-item">
                                <div className="imet-nav-divider"></div>
                            </li>
                            <div className="imet-nav-divider"></div>
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
        </>
    )
}

export default HomeHeader
