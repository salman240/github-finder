import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    Axios.get("https://api.github.com/users")
      .then((data) => {
        console.log(data);
        this.setState({ loading: false, users: data.data });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
