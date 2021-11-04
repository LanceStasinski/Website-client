import React from "react";

// import classes from "./MainNavigation.module.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

const MainNavigation: React.FC = () => {
  return (
    <MainHeader>
      <h1>Lance Stasinski</h1>
      <nav><NavLinks /></nav>
    </MainHeader>
  );
};

export default MainNavigation;
