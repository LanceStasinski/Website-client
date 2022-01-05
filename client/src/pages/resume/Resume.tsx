import React from "react";

import classes from "./Resume.module.css";
import headshot from "../../assets/headshot-4.jpg";
import emailIcon from "../../assets/social-icons/email.png";
import phoneIcon from "../../assets/social-icons/phone.png";
import locationIcon from "../../assets/social-icons/location.png";
import globeIcon from "../../assets/social-icons/globe.png";
import linkedinIcon from "../../assets/social-icons/linkedin2.png";
import githubIcon from "../../assets/social-icons/github2.png";
import calendarIcon from "../../assets/social-icons/calendar.png";
import SkillsSection from "./SkillsSection";
import CodingSkill from "./CodingSkill";

const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL;

const Resume: React.FC = () => {
  document.title = "Resume | Lance Stasinski";
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
                <a
                  href={`${WEBSITE_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lancestasinski.com
                </a>
              </li>
              <li>
                <img src={linkedinIcon} alt="LinkedIn icon" />
                <a
                  href="https://www.linkedin.com/in/lance-stasinski/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/lance-stasinski
                </a>
              </li>
              <li>
                <img src={githubIcon} alt="Github icon" />
                <a
                  href="https://github.com/LanceStasinski"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/LanceStasinski
                </a>
              </li>
            </ul>
          </header>
          <div className={classes["resume-body"]}>
            <section className={classes.skills}>
              <SkillsSection heading="EDUCATION">
                <ul className={classes["education-section"]}>
                  <li>
                    <p>M.S. - Botany and Plant Pathology</p>
                    <p>
                      <b>University of Maine</b>
                    </p>
                    <div className={classes["education-section-div"]}>
                      <img src={calendarIcon} alt="Calendar icon" />
                      <p>September 2019 - December 2021</p>
                    </div>
                    <div className={classes["education-section-div"]}>
                      <img src={locationIcon} alt="Location icon" />
                      <p>Orono, ME</p>
                    </div>
                  </li>
                  <li>
                    <p>B.S. - Biology</p>
                    <p>
                      <b>Chadron State College</b>
                    </p>
                    <div className={classes["education-section-div"]}>
                      <img src={calendarIcon} alt="Calendar icon" />
                      <p>September 2015 - May 2019</p>
                    </div>
                    <div className={classes["education-section-div"]}>
                      <img src={locationIcon} alt="Location icon" />
                      <p>Chadron, NE</p>
                    </div>
                  </li>
                </ul>
              </SkillsSection>
              <SkillsSection heading="SKILLS">
                <h4 className={classes["skill-category"]}>Frontend</h4>
                <ul className={classes["skill-list"]}>
                  <CodingSkill experience={90} skillName="JavaScript" />
                  <CodingSkill experience={80} skillName="TypeScript" />
                  <CodingSkill experience={90} skillName="HTML5" />
                  <CodingSkill experience={85} skillName="CSS3" />
                  <CodingSkill experience={75} skillName="SASS" />
                  <CodingSkill experience={85} skillName="React.js" />
                  <CodingSkill experience={80} skillName="Jest.js" />
                  <CodingSkill experience={60} skillName="Figma" />
                </ul>
                <h4 className={classes["skill-category"]}>Backend</h4>
                <ul className={classes["skill-list"]}>
                  <CodingSkill experience={75} skillName="Node.js" />
                  <CodingSkill experience={75} skillName="Express.js" />
                  <CodingSkill experience={50} skillName="Mocha.js" />
                  <CodingSkill experience={50} skillName="Chai.js" />
                  <CodingSkill experience={60} skillName="MongoDB" />
                </ul>
                <h4 className={classes["skill-category"]}>Other</h4>
                <ul className={classes["skill-list"]}>
                  <CodingSkill experience={85} skillName="Git" />
                  <CodingSkill experience={80} skillName="R" />
                  <CodingSkill experience={20} skillName="Python" />
                  <CodingSkill experience={10} skillName="Java" />
                </ul>
              </SkillsSection>
            </section>
            <section>
              <div className={classes.summary}>
                <h3>SUMMARY</h3>
                <p>something</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Resume;
