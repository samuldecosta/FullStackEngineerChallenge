import React, { Fragment, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { isMobile } from "react-device-detect";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MOBILE, DESKTOP } from "./theme/constants";
import Theme from "./theme";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard";
import Register from "./components/auth/Register";
import UpdateEmployee from "./components/auth/UpdateEmployee";
import FeedBacks from "./components/feedback";
import PrivateRoute from "./routing/PrivateRoute";
import Alert from "./components/layout/Alert";
import Loader from "./components/layout/Loader";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

// `deviceType` is now accessible to all component styles using `props.theme.deviceType`
Theme.deviceType = isMobile ? MOBILE : DESKTOP;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Router>
          <Fragment>
            <Navbar />
            <Loader />
            <section className="container main-section">
              <Alert />
              <Switch>
                <Route exact path={["/", "/login"]} component={Login} />
                <PrivateRoute exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/update/:empId"
                  component={UpdateEmployee}
                />
                <PrivateRoute
                  exact
                  path={["/feedback/:empId", "/feedback/:empId/:reqId"]}
                  component={FeedBacks}
                />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
