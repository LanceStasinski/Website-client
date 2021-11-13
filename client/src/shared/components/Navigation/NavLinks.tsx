import React, { useContext } from "react";

import NavItem from "./NavItem";
import classes from "./NavLinks.module.css";
import { AuthContext } from "../../context/auth-context";


const NavLinks: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavItem to="/cv">CV</NavItem>
      </li>
      <li>
        <NavItem to="/portfolio">PORTFOLIO</NavItem>
      </li>
      <li>
        <NavItem to="/blog">BLOG</NavItem>
      </li>
      <li>
        <NavItem to="/contact">CONTACT</NavItem>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>LOGOUT</button>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li className={classes['nav-links_auth']}>
          <NavItem to='/auth' authLink={true}>LOGIN</NavItem>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
