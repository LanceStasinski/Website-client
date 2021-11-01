import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks: React.FC = () => {
  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to="/" exact>
          ABOUT
        </NavLink>
      </li>
      <li>
        <NavLink to="/cv">CV</NavLink>
      </li>
      <li>
        <NavLink to="/portfolio">PORTFOLIO</NavLink>
      </li>
      <li>
        <NavLink to="/blog">BLOG</NavLink>
      </li>
      <li>
        <NavLink to="/contact">CONTACT</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;