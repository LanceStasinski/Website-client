import React, { useState, useEffect } from "react";

import classes from "./Portfolio.module.css";
import PortfolioCard from "./PortfolioCard";
import websiteImage from "../../assets/project-images/website.JPG";
import travelAppImage from "../../assets/project-images/travel-app.JPG";
import nlpAppImage from "../../assets/project-images/NLP-app.JPG";
import weatherAppImage from "../../assets/project-images/weather-journal-app.JPG";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

const SERVER = process.env.REACT_APP_SERVER;

const Portfolio: React.FC = () => {
  document.title = "Portfolio | Lance Stasinski";

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModal}
        header="NOTICE"
        footer={
          <Button inverse onClick={closeModal}>
            Okay
          </Button>
        }
        backdropClass={classes.backdrop}
      >
        <p>
          This page is still under development. More projects will be added
          soon!
        </p>
      </Modal>
      <div className={classes.portfolio}>
        <h1>PORTFOLIO</h1>
        <hr />
        <div className={classes.projects}>
          <PortfolioCard
            image={weatherAppImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-03-WeatherJournalApp-React"
            external={true}
            projectUrl={`${SERVER}/weather-journal-app`}
            title='Weather Journal'
            description="This app generates a journal entry that contains text input by the user and weather data for the selected zip code. The user has access to complete CRUD operations and they can change their zip code or their prefered measurement units at any time."
            technologies="TypeScript, React, styled components, Node/Express, MongoDB, Axios"
          />
          <PortfolioCard
            image={websiteImage}
            gitHubLink="https://github.com/LanceStasinski/Website-client"
            external={false}
            projectUrl={`${process.env.REACT_APP_WEBSITE_URL}`}
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
            technologies="HTML, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios, Jest"
          />
          <PortfolioCard
            image={nlpAppImage}
            gitHubLink="https://github.com/LanceStasinski/FEND-04-EvaluateNewsApp"
            external={true}
            projectUrl={`${SERVER}/sentiment-analysis-app`}
            title="Sentiment Analysis App"
            description="This app takes a in a URL and the UI is updated based on a sentiment analysis of the text at that URL. The sentiment analysis is performed by a natural language processor at a third party API."
            technologies="HTML, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
