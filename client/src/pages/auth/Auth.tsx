import React from "react";

import classes from "./Auth.module.css";
import AuthCard from "./AuthCard";

const Auth: React.FC = () => {
  document.title = "Login | Lance Stasinski";
  return (
    <div className={classes.auth}>
      <AuthCard />
    </div>
  );
};

export default Auth;
