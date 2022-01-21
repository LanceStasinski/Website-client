import React from "react";

import classes from "./About.module.css";

import SocialIcon from "./SocialIcon";
import backgroundImage from "../../assets/about-background.JPG";
import githubIcon from "../../assets/social-icons/github.png";
import linkedinIcon from "../../assets/social-icons/linkedin.png";
import twitterIcon from "../../assets/social-icons/twitter.png";
import headshot from "../../assets/headshot-3.jpg";

const About: React.FC = () => {
  document.title = "Lance Stasinski";
  return (
    <React.Fragment>
      <div className={classes.headshot}>
        <img src={headshot} alt="Lance Stasinski" />
      </div>
      <div
        className={classes["background-image"]}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          position: "fixed",
          backgroundPosition: "right 0",
          backgroundSize: "cover",
          height: "100%",
          zIndex: -5,
          right: 0,
          top: 0,
        }}
      ></div>
      <div className={classes.about}>
        <h1>Hello World</h1>
        <p>
          My name is Lance Stasinski and welcome to my personal website. I'm a
          self-taught web developer with a background in quantitative biology. I
          gained an appreciation for programming while analyzing
          high-dimensional datasets in the R statistical computing language.
          Since then, I have transitioned my programming expertise to building
          full stack web applications, and I have found a passion for building
          elegant user interfaces along the way.
        </p>
        <p>
          While you're here, feel free to peruse my CV and resume, explore and
          test my portfolio projects, or read my blog that details concepts that
          I have found challenging or important. You can get in touch with
          me by visiting the contact page or you can connect with me over social
          media linked below.
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
