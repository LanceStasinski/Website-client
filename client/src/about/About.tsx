import React from "react";

import classes from "./About.module.css";


import backgroundImage from '../assets/about-background.JPG'

const About: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes['about-background']}>
        <img src={backgroundImage} alt='Lance working with his cat, Billie, in the background' />
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
      </div>
    </React.Fragment>
  );
};

export default About;
