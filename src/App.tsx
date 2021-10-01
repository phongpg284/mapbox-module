import { Route, Switch } from "react-router";
import "./App.css";
import MapPage from "./pages/Map/Map";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/map"
          render={({ match: { url } }) => <MapPage parentPath={url} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
