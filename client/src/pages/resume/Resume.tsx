import React from "react";

import classes from "./Resume.module.css";
import headshot from "../../assets/headshot-4.jpg";
import emailIcon from "../../assets/social-icons/email.png";
import phoneIcon from "../../assets/social-icons/phone.png";
import locationIcon from "../../assets/social-icons/location.png";
import globeIcon from "../../assets/social-icons/globe.png";
import linkedinIcon from "../../assets/social-icons/linkedin2.png";
import githubIcon from "../../assets/social-icons/github2.png";


const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL;

const Resume: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes["resume-wrapper"]}>
        <div className={classes.page}>
          <header>
            <img
              src={headshot}
              className={classes.headshot}
              alt="Headshot of Lance Stasinski"
            />

            <div className={classes.title}>
              <h2 className={classes["first-name"]}>LANCE</h2>
              <h2 className={classes["last-name"]}>STASINSKI</h2>
              <h3 className={classes.profession}>WEB DEVELOPER</h3>
            </div>
            <ul className={classes["contact-info"]}>
              <li>
                <img src={emailIcon} alt="email icon" />
                <p>lance.stasinski@gmail.com</p>
              </li>
              <li>
                <img src={phoneIcon} alt="phone icon" />
                <p>(970) 396-3329</p>
              </li>
              <li>
                <img src={locationIcon} alt="location icon" />
                <p>Bangor, ME</p>
              </li>
              <li>
                <img src={globeIcon} alt="website icon" />
                <a href={`${WEBSITE_URL}`}>lancestasinski.com</a>
              </li>
              <li>
                <img src={linkedinIcon} alt="LinkedIn icon" />
                <a href="https://www.linkedin.com/in/lance-stasinski/">
                  linkedin.com/in/lance-stasinski
                </a>
              </li>
              <li>
                <img src={githubIcon} alt="Github icon" />
                <a href="https://github.com/LanceStasinski">
                  github.com/LanceStasinski
                </a>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Resume;
