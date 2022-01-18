import React from "react";

import classes from "./Portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import fillerImg from '../../assets/headshot-4.jpg'


const Portfolio: React.FC = () => {
  document.title = "Portfolio | Lance Stasinski";
  return (
    <div className={classes.portfolio}>
      <h1>PORTFOLIO</h1>
      <hr />
      <div className={classes.projects}>
        <PortfolioCard
          image={fillerImg}
          gitHubLink="https://github.com/LanceStasinski/Website-client"
          external={true}
          projectUrl="http//:localhost:3000"
          title="Test1"
          description="testing testing testing testing testing testing"
          technologies="TypeScript, React, CSS Modules, Node.js, Express.js, MongoDB, AWS S3"
        />
        <PortfolioCard
          image={fillerImg}
          gitHubLink="https://github.com/LanceStasinski/Website-client"
          external={false}
          projectUrl="http//:localhost:3000"
          title="Test2"
          description="testing testing testing testing testing testing"
          technologies="TypeScript, React, CSS Modules, Node.js, Express.js, MongoDB, AWS S3"
        />
        <PortfolioCard
          image={fillerImg}
          gitHubLink="https://github.com/LanceStasinski/Website-client"
          external={false}
          projectUrl="http//:localhost:3000"
          title="Test3"
          description="testing testing testing testing testing testing"
          technologies="TypeScript, React, CSS Modules, Node.js, Express.js, MongoDB, AWS S3"
        />
      </div>
    </div>
  );
};

export default Portfolio;
