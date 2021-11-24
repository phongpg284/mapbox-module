import { useHistory } from 'react-router'
import poster from '../../../assets/HomeContent/poster.png'

const HomeContent = () => {
    const history = useHistory()
    return (
        <div className="home-content-wrapper">
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
                            <button className="about-us-button" type="button" onClick={() => history.push('/login')}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imet-footer" id="contacts">
                <div className="container">
                    <div className="row">
                        <div className="col-12"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeContent
