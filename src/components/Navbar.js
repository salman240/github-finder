import React, { Component } from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  static defaultProps = {};
  static propTypes = {};

  render() {
    const { title } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className="fa fa-github"></i>
          {title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
