import React from "react";
import { Link } from "react-router-dom";

// import classes from "./MainNavigation.module.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import classes from './MainNavigation.module.css'

const MainNavigation: React.FC = () => {
  return (
    <MainHeader>
      <h1 className={classes['main-title']}>
        <Link to='/'>LANCE STASINSKI</Link>
      </h1>
      <button className={classes['menu-btn']}>
        <span />
        <span />
        <span />
      </button>
      <nav className={classes['main-nav']}><NavLinks /></nav>
    </MainHeader>
  );
};

export default MainNavigation;
