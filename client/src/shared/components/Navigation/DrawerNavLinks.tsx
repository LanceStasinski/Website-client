import React, { useContext } from "react";

import DrawerNavItem from "./DrawerNavItem";
import classes from "./DrawerNavLinks.module.css";
import { AuthContext } from "../../context/auth-context";

const DrawerNavLinks: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes["drawer-nav-links"]}>
      <li>
        <DrawerNavItem to="/resume">RESUME</DrawerNavItem>
      </li>
      <li>
        <DrawerNavItem to="/portfolio">PORTFOLIO</DrawerNavItem>
      </li>
      <li>
        <DrawerNavItem to="/blog">BLOG</DrawerNavItem>
      </li>
      <li>
        <DrawerNavItem to="/contact">CONTACT</DrawerNavItem>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default DrawerNavLinks;
