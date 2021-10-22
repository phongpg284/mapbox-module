import { Redirect, Route } from 'react-router'
import { useAppSelector } from '../../app/store'

const PrivateRoute = ({ children, ...rest }: any) => {
    const account = useAppSelector((state) => state.account)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                account.accessToken ? children : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute
