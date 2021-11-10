import { Redirect, Route } from 'react-router'
import { useAppSelector } from '../../app/store'

const PrivateRoute = ({ component: Component, ...rest }: any) => {    
    const account = useAppSelector((state) => state.account)
    if (!!account.accessToken && !!account.id) {
        return <Route {...rest} render={(props) => <Component {...props} />} />
    }
    
    return <Route {...rest} render={(props) => <Redirect to="/login" />} />
}

export default PrivateRoute
