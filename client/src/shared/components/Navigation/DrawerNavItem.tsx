import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./DrawerNavItem.module.css";

const DrawerNavItem: React.FC<{
  to: string;
  exact?: boolean;
  className?: string;
  important?: boolean;
}> = (props) => {
  return (
    <NavLink
      to={props.to}
      exact={!!props.exact}
      activeClassName={!props.important ? classes["active-link"] : ''}
    >
      {props.children}
    </NavLink>
  );
};

export default DrawerNavItem;
