import React from "react";

import NavItem from "./NavItem";
import classes from "./NavLinks.module.css";

const NavLinks: React.FC = () => {
  return (
    <ul className={classes['nav-links']}>
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
    </ul>
  );
};

export default NavLinks;