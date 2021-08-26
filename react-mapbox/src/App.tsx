import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import FieldCreate from "./FieldCreate";
import FieldPage from "./FieldPage";
import LocalSaveMapbox from "./LocalSaveMapbox";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/local">
              <LocalSaveMapbox />
            </Route>

            <Route exact path="/create">
              <FieldCreate />
            </Route>

            <Route exact path="/">
              <FieldPage />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
