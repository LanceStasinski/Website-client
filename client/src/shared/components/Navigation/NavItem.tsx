import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.css";

const NavItem: React.FC<{
  to: string;
  exact?: boolean;
  authLink?: boolean;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <NavLink
      to={props.to}
      exact={!!props.exact}
      activeClassName={classes["active-link"]}
      style={props.style}
    >
      {props.children}
    </NavLink>
  );
};

export default NavItem;
