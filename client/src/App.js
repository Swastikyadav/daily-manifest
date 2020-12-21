import React from "react";
import { Alert } from "antd";
import axios from "axios";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import "antd/dist/antd.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import DmGuide from "./pages/DmGuide";

import Header from "./components/Header";
import ManifestIndex from "./components/manifests/index";
import NewManifest from "./components/manifests/new";
import EditManifest from "./components/manifests/edit";
import Wrapper from "./components/Wrapper";

import { UserProvider } from "./context/UserContext";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged_in: false,
      user: null,
      render: false,
      navigationOptions: {},
      error: ""
    }

    this.setUser = this.setUser.bind(this);
    this.setError = this.setError.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  componentDidMount() {
    axios.get("/api/v1/sessions/logged_in", {withCredentials: true})
      .then(res => {
        this.setState({
          logged_in: res.data.logged_in,
          user: res.data.user,
          render: true
        });
      })
  }

  setUser(user) {
    this.setState({
      user,
      logged_in: true,
      error: ""
    });
  }

  setError(error) {
    this.setState({
      error
    });
  }

  handleLogout() {
    axios.delete("/api/v1/sessions", {withCredentials: true})
      .then(res => {
        this.setState({
          logged_in: !res.data.logged_out,
          user: null
        });
      })
  }

  handleAlertClose() {
    this.setState({
      error: ""
    });
  }

  privateRoutes() {
    return (
      <UserProvider value={this.state.user}>
        <Header handleLogout={this.handleLogout} />
        <Wrapper>
          <Switch>
            <Route exact path="/dm-guide">
              <DmGuide />
            </Route>
            <Route exact path="/manifests/new">
              <NewManifest setError={this.setError} />
            </Route>
            <Route exact path="/manifests/:id">
              <EditManifest />
            </Route>
            <Route exact path="/manifests">
              <ManifestIndex setError={this.setError} />
            </Route>
            <Route path="*">
              <Redirect to="/manifests" />
            </Route>
          </Switch>
        </Wrapper>
      </UserProvider>
    );
  }

  publicRoutes() {
    return (
      <Switch>
        <Route exact path="/dm-guide">
          <DmGuide />
        </Route>
        <Route exact path="/login">
          <LoginPage changeUser={this.setUser} setError={this.setError} />
        </Route>
        <Route exact path="/register">
          <RegistrationPage changeUser={this.setUser} setError={this.setError} />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  render () {
    return (
      <div className="relative">
        {this.state.render && (
          <BrowserRouter>
            {(this.state.logged_in && this.state.user) ? this.privateRoutes() : this.publicRoutes()}
          </BrowserRouter>
        )}
        {this.state.error ? (
          <div className="w-full absolute top-14 flex justify-center">
            <Alert
              message={this.state.error}
              type="error"
              showIcon
              className="w-96"
              closable
              afterClose={this.handleAlertClose}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
