import React from "react";

import classes from "./Portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import websiteImage from "../../assets/project-images/website.JPG";
import travelAppImage from "../../assets/project-images/travel-app.JPG";
import nlpAppImage from "../../assets/project-images/NLP-app.JPG";
import landPageImage from "../../assets/project-images/landing-page.JPG";
import blogImage from "../../assets/project-images/blog.JPG";
import weatherAppImage from "../../assets/project-images/weather-journal-app.JPG";
import stateGovLandingPageImage from "../../assets/project-images/state-gov-landing-page.JPG";
import wakeSkateImage from "../../assets/project-images/wakeskate.JPG";

const SERVER = process.env.REACT_APP_SERVER;

const Portfolio: React.FC = () => {
  document.title = "Portfolio | Lance Stasinski";

  return (
    <React.Fragment>
      <div className={classes.portfolio}>
        <h1>PORTFOLIO</h1>
        <hr />
        <div className={classes.projects}>
          <PortfolioCard
            image={wakeSkateImage}
            gitHubLink="https://github.com/LanceStasinski/wakeskate-web"
            external={true}
            projectUrl="https://wakeskate.herokuapp.com/"
            title="WakeSkate?"
            description="This application rates weather conditions for water skiing given a location chosen by the user. The client allows the user to choose a location from a map, and the UI updates with hourly and daily weather ratings and forecasts. The REST API acts as a middleware between the client and the Google Maps and Open Weather Map APIs."
            technologies="Ember, Ember Wormhole, JavaScript, TypeScript, Tailwind CSS, Axios, Node, Express"
          />
          <PortfolioCard
            image={stateGovLandingPageImage}
            gitHubLink="https://github.com/LanceStasinski/PWW-exercise"
            external={true}
            projectUrl="https://pww-exercise.web.app/"
            title="State Government Landing Page"
            description="This landing page was built from a design artifact and demonstrates my ability to create reusable components and implement pixel-perfect and responsive styling."
            technologies="TypeScript, React, Tailwind CSS, Jest"
          />
          <PortfolioCard
            image={weatherAppImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-03-WeatherJournalApp-React"
            external={true}
            projectUrl={`${SERVER}/weather-journal-app`}
            title="Weather Journal"
            description="This app generates a journal entry that contains text input by the user and weather data for the selected zip code. The user has access to complete CRUD operations and they can change their zip code or their prefered measurement units at any time."
            technologies="TypeScript, React, styled components, Node/Express, MongoDB, Axios"
          />
          <PortfolioCard
            image={websiteImage}
            gitHubLink="https://github.com/LanceStasinski/Website-client"
            external={false}
            projectUrl={"/portfolio/more-info"}
            title="This Website"
            description="My personal website is a single page web application that connects to a REST API. The blog portion is a fullstack application in itself. I write individual posts using a dynamic form and data is stored in MongoDB and an AWS S3 bucket."
            technologies="TypeScript, React, CSS Modules, Node/Express, MongoDB, AWS S3, Jest, Mocha, Chai"
          />
          <PortfolioCard
            image={travelAppImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-05-TravelApp"
            external={true}
            projectUrl={`${SERVER}/travel-app`}
            title="Travel App"
            description="This app takes in a location and arrival and departure dates for a trip and returns the weather forecast, information about the country to be visited, and an image of the location. This app makes HTTP requests to four external APIs in specific order to gather the necessary information."
            technologies="HTML5, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios, Jest"
          />
          <PortfolioCard
            image={nlpAppImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-04-EvaluateNewsApp"
            external={true}
            projectUrl={`${SERVER}/sentiment-analysis-app`}
            title="Sentiment Analysis App"
            description="This app takes a in a URL and the UI is updated based on a sentiment analysis of the text at that URL. The sentiment analysis is performed by a natural language processor at a third party API."
            technologies="HTML5, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios"
          />
          <PortfolioCard
            image={landPageImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-02-LandingPage"
            external={true}
            projectUrl={`${SERVER}/landing-page`}
            title="Landing Page"
            description="This project is a responsive landing page with CSS animations and dynamic styles that are applied when different sections of the page come into view."
            technologies="HTML5, CSS3, JavaScript"
          />
          <PortfolioCard
            image={blogImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-01-BlogPost"
            external={true}
            projectUrl={`${SERVER}/my-first-blog`}
            title="Blog Site"
            description="This project was the first website I built with HTML and CSS. It is a responsive and accessible blog that was built to become accustomed to the structure of HTML and to learn how to work with CSS Grid and Flexbox."
            technologies="HTML5, CSS3"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
