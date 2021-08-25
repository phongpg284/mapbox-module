import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import FieldCreate from "./FieldCreate";
import LocalSaveMapbox from "./LocalSaveMapbox";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/local">
              <LocalSaveMapbox />
            </Route>

            <Route exact path="/">
              <FieldCreate />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
