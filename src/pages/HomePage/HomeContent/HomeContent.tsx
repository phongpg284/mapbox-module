import poster from "../../../assets/HomeContent/poster.png";

const HomeContent = () => {
  return (
    <div className="home-content">
      <nav className="navbar sticky-top navbar-expand-lg imet-navbar">
        <div className="container">
          <a
            className="navbar-brand imet-branch d-flex align-items-center"
            href="#"
          >
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

          <div
            className="collapse navbar-collapse imet-navbar-collapse justify-content-end align-items-center"
            id="navbarSupportedContent"
          >
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
                <a className="imet-navbar-nav-link nav-link" href="#">
                  Sign In
                </a>
              </li>
              <li className="imet-navbar-nav-item nav-item">
                <a className="imet-navbar-nav-link nav-link" href="#">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="about-us d-flex align-items-center" id="about-us">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="about-us-title">why choose us</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="about-us-icon safety"></div>
              <div className="about-us-description">Safety</div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="about-us-icon accuracy"></div>
              <div className="about-us-description">Accuracy</div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="about-us-icon smart"></div>
              <div className="about-us-description">Smart</div>
            </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <button className="about-us-button" type="button">Sign In</button>
              </div>
          </div>
        </div>
      </div>
      <div className="imet-footer" id="contacts">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
