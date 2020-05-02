import React from "react";

const Spinner = () => {
  return (
    <>
      <img
        src={require("../../assets/images/spinner.gif")}
        alt=""
        style={{ width: 200, margin: "auto", display: "block" }}
      />
    </>
  );
};

export default Spinner;
