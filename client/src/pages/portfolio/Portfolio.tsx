import React from "react";

import classes from './Portfolio.module.css'

const Portfolio: React.FC = () => {
  document.title = "Portfolio | Lance Stasinski";
  return (
    <div className={classes.portfolio}>
      <h1>PORTFOLIO</h1>
      <hr />
    </div>
  )
};

export default Portfolio;
