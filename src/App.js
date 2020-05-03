import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Users from "./components/user/Users";
import Axios from "axios";
import Search from "./components/Search";
import Alert from "./components/Alert";
import About from "./components/pages/About";
import User from "./components/user/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerts] = useState(null);

  const searchUsers = (text) => {
    setLoading(true);

    Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        setLoading(false);
        setUsers(data.data.items);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getUser = (username) => {
    setLoading(true);

    Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        setLoading(false);
        setUser(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getUserRepos = (username) => {
    setLoading(true);

    Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        setLoading(false);
        setRepos(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const setAlert = (message, type) => {
    setAlerts({ message, type });
    setTimeout(() => {
      setAlerts(null);
    }, 2000);
  };

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </>
              )}
            />
            <Route path="/about" exact component={About} />
            <Route
              path="/users/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
