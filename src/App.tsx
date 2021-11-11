import './App.css'
import { Route, Switch } from 'react-router'

import HomePage from './pages/HomePage/HomePage'
import MapPage from './pages/Map/Map'

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import { useMediaQuery } from 'react-responsive'
import LoginMobile from './components/LoginMobile'

function App() {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    return (
        <div className="App">
            <Switch>
                <PrivateRoute path="/map">
                    <MapPage parentPath={'/map'} />
                </PrivateRoute>
                {isMobile && (
                    <Route path="/login">
                        <LoginMobile />
                    </Route>
                )}
                {!isMobile && (
                    <Route path="/login">
                        <Login />
                    </Route>
                )}
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/">
                    <HomePage parentPath={'/'} />
                </Route>
            </Switch>
        </div>
    )
}

export default App
