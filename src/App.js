import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Users from "./components/user/Users";
import Search from "./components/Search";
import Alert from "./components/Alert";
import About from "./components/pages/About";
import User from "./components/user/User";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className="App">
            <Navbar title="Github Finder" />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <>
                      <Search />
                      <Users />
                    </>
                  )}
                />
                <Route path="/about" exact component={About} />
                <Route path="/users/:login" component={User} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
