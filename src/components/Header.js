import React from "react";
import logo from "../logo-teal.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="deliveroo logo" />
      </div>
    </div>
  );
};

export default Header;
