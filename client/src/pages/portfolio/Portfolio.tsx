import React from "react";

import classes from "./Portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import websiteImage from '../../assets/project-images/website.JPG'


import fillerImg from '../../assets/headshot-4.jpg'


const Portfolio: React.FC = () => {
  document.title = "Portfolio | Lance Stasinski";
  return (
    <div className={classes.portfolio}>
      <h1>PORTFOLIO</h1>
      <hr />
      <div className={classes.projects}>
        <PortfolioCard
          image={websiteImage}
          gitHubLink="https://github.com/LanceStasinski/Website-client"
          external={true}
          projectUrl="http//:localhost:3000"
          title="This Website"
          description="My personal website was is a single page web application that connects to a REST API. The blog portion is a fullstack application in itself. I write individual post using a dynamic form and data is stored in MongoDB and an AWS S3 bucket. Click 'visit' to learn more."
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
