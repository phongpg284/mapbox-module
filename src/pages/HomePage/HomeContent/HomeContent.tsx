import { useHistory } from 'react-router'
import poster from '../../../assets/HomeContent/poster.png'
import { useAppSelector } from '../../../app/store'

const HomeContent = () => {
    const account = useAppSelector((state) => state.account)
    const history = useHistory()
    return (
        <div className="home-content">
            <div className="about-us d-flex align-items-center" id="aboutUs">
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
                            {!account?.accessToken && !account?.role && (
                                <button className="about-us-button" type="button" onClick={() => history.push('/login')}>
                                    Sign In
                                </button>               
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default HomeContent
