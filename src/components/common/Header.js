import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const activeStyle = { color: "#F1582A" };
  return (
    <div>
      <nav>
        <NavLink to="/" exact activeStyle={activeStyle}>
          Home
        </NavLink>
        {"|"}
        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
