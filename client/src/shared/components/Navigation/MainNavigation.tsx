import React, { useState } from "react";
import { Link } from "react-router-dom";

// import classes from "./MainNavigation.module.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import classes from "./MainNavigation.module.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import DrawerNavLinks from "./DrawerNavLinks";

const MainNavigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHander = () => {
    setDrawerIsOpen(false)
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHander} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHander}>
          <nav>
            <DrawerNavLinks />
          </nav>
      </SideDrawer>
      <MainHeader>
        <h1 className={classes["main-title"]}>
          <Link to="/">LANCE STASINSKI</Link>
        </h1>
        <button className={classes["menu-btn"]} onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <nav className={classes["main-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
