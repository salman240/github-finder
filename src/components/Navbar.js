import React from "react";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const { title } = props;
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className="fa fa-github"></i>
        {title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
