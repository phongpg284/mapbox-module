import { Route, Switch } from 'react-router'
import './App.css'
import Login from './components/Login'
import HomePage from './pages/HomePage/HomePage'
import MapPage from './pages/Map/Map'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route
                    path="/map"
                    render={({ match: { url } }) => (
                        <MapPage parentPath={url} />
                    )}
                />
                <Route path="/login">
                    <Login />
                </Route>
                <Route
                    path="/"
                    render={({ match: { url } }) => (
                        <HomePage parentPath={url} />
                    )}
                />
            </Switch>
        </div>
    )
}

export default App
