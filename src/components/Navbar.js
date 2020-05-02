import React from "react";

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

Navbar.defaultProps = {};
Navbar.propTypes = {};

export default Navbar;
