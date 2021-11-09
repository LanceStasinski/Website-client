import React from "react";

import classes from "./About.module.css";

import SocialIcon from "./SocialIcon";
import backgroundImage from "../assets/about-background.JPG";
import githubIcon from "../assets/social-icons/github.png";
import linkedinIcon from "../assets/social-icons/linkedin.png";
import twitterIcon from "../assets/social-icons/twitter.png";

const About: React.FC = () => {
  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          position: "fixed",
          backgroundPosition: 'right 0',
          backgroundSize: "cover",
          height: '100%',
          zIndex: -5,
          right: 0,
          top: 0
        }}
      >
        {/* <img
          src={backgroundImage}
          alt="Lance working with his cat, Billie, in the background"
        /> */}
      </div>
      <div className={classes.about}>
        <h2>Hello World</h2>
        <p>
          My name is Lance Stasinski and welcome to my personal website. I'm a
          quantitative biologist turned web developer, and I have found a love
          for building fullstack applications with elegant user interfaces. This
          site contains information about me, the projects I've built so far,
          and a blog where I explain concepts that I have found challenging
          while learning to code.
        </p>
        <ul className={classes["social-links"]}>
          <li>
            <SocialIcon
              imageUrl={githubIcon}
              altTxt="Github icon"
              socialLink="https://github.com/LanceStasinski"
            />
          </li>
          <li>
            <SocialIcon
              imageUrl={linkedinIcon}
              altTxt="LinkedIn icon"
              socialLink="https://www.linkedin.com/in/lance-stasinski/"
            />
          </li>
          <li>
            <SocialIcon
              imageUrl={twitterIcon}
              altTxt="Twitter icon"
              socialLink="https://twitter.com/LanceStasinski"
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default About;
