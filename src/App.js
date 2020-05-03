import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Users from "./components/user/Users";
import Axios from "axios";
import Search from "./components/Search";
import Alert from "./components/Alert";
import About from "./components/pages/About";
import User from "./components/user/User";

// repo check
class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = (text) => {
    this.setState({ loading: true });

    Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        this.setState({ loading: false, users: data.data.items });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  getUser = (username) => {
    this.setState({ loading: true });

    Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        this.setState({ loading: false, user: data.data });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  getUserRepos = (username) => {
    this.setState({ loading: true });

    Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then((data) => {
        console.log(data);
        this.setState({ loading: false, repos: data.data });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 2000);
  };

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;
