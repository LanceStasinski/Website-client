import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./DrawerNavItem.module.css";

const DrawerNavItem: React.FC<{ to: string; exact?: boolean }> = (props) => {
  return (
    <NavLink
      to={props.to}
      exact={!!props.exact}
      activeClassName={classes["active-link"]}
      className={classes['drawer-nav-item']}
    >
      {props.children}
    </NavLink>
  );
};

export default DrawerNavItem;
