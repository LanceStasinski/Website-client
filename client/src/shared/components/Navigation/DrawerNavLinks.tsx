import React from "react";
import DrawerNavItem from "./DrawerNavItem";
import classes from "./DrawerNavLinks.module.css";

const DrawerNavLinks: React.FC = () => {
  return (
    <ul className={classes['drawer-nav-links']}>
      <li>
        <DrawerNavItem to="/cv">CV</DrawerNavItem>
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
    </ul>
  );
};

export default DrawerNavLinks;