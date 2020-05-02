import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Axios from "axios";
import Search from "./components/Search";

class App extends Component {
  state = {
    users: [],
    loading: false,
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

  clearUsers = () => {
    this.setState({ users: [] });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
