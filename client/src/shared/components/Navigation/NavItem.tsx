import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.css";

const NavItem: React.FC<{ to: string; exact?: boolean }> = (props) => {
  return (
    <NavLink
      to={props.to}
      exact={!!props.exact}
      activeClassName={classes["active-link"]}
    >
      {props.children}
    </NavLink>
  );
};

export default NavItem;
