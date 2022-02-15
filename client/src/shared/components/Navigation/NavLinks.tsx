import React, { useContext } from "react";

import NavItem from "./NavItem";
import classes from "./NavLinks.module.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavItem to="/resume">RESUME</NavItem>
      </li>
      <li>
        <NavItem to="/portfolio">PORTFOLIO</NavItem>
      </li>
      <li>
        <NavItem to="/blog">BLOG</NavItem>
      </li>
      <li>
        <NavItem
          style={{ marginRight: authCtx.isLoggedIn ? "0.5rem" : "0" }}
          to="/contact"
        >
          CONTACT
        </NavItem>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
