import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import FieldCreate from "./FieldCreate";
import FieldPage from "./FieldPage";
import FieldCard from "./FieldPage/FieldCard/FieldCard";
import { FieldList } from "./FieldPage/FieldList";
import LocalSaveMapbox from "./LocalSaveMapbox";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/local">
            <LocalSaveMapbox />
          </Route>

          <Route exact path="/create">
            <FieldCreate />
          </Route>

          <Route exact path="/list">
            <FieldPage>{(props: any) => <FieldList data={props} />}</FieldPage>
          </Route>

          <Route exact path="/">
            <FieldPage>{(props: any) => <FieldCard data={props} />}</FieldPage>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
