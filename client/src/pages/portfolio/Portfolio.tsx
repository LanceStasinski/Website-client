import React from "react";

import classes from "./Portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import websiteImage from "../../assets/project-images/website.JPG";
import travelAppImage from "../../assets/project-images/travel-app.JPG";

import fillerImg from "../../assets/headshot-4.jpg";

const SERVER = process.env.REACT_APP_SERVER;

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
          external={false}
          projectUrl="http//:localhost:3000"
          title="This Website"
          description="My personal website is a single page web application that connects to a REST API. The blog portion is a fullstack application in itself. I write individual posts using a dynamic form and data is stored in MongoDB and an AWS S3 bucket. Click 'visit' to learn more."
          technologies="TypeScript, React, CSS Modules, Node/Express, MongoDB, AWS S3, Jest, Mocha, Chai"
        />
        <PortfolioCard
          image={travelAppImage}
          gitHubLink="https://github.com/LanceStasinski/FEND-05-TravelApp"
          external={true}
          projectUrl={`${SERVER}/travel-app`}
          title="Travel App"
          description="This app takes in a location and arrival and departure dates for a trip and returns the weather forecast, information about the country to be visited, and an image of the location. This app makes HTTP requests to four external APIs to gather the necessary information."
          technologies="HTML, SCSS, JavaScript, Node/Express, Webpack, Service workers, Axios, Jest"
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
