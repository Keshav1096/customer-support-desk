import { BrowserRouter as Router, Switch } from "react-router-dom";
import SecuredRouter from "./components/SecuredRouter";
import CommonRouter from "./components/CommonRouter";
import Example from "./components/HomeLayout";

function App() {
  return (
    <Router>
      <Switch>
        <CommonRouter
          exact
          path="/login"
          isAuth={false}
          component={() => <div>Login</div>}
        />
        <SecuredRouter
          exact
          path="/"
          component={() => <div>Home</div>}
          isAuth={false}
        />
        <SecuredRouter
          exact
          path="/example"
          component={() => <>home</>}
          isAuth={true}
        />
      </Switch>
    </Router>
  );
}

export default App;
