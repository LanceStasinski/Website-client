import React, { useEffect, useState } from "react";

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
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const REST_API = process.env.REACT_APP_REST_API;

const Resume: React.FC = () => {
  document.title = "Resume | Lance Stasinski";
  const [resumeLink, setResumeLink] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getResume = async () => {
      try {
        const responseData = await sendRequest(`${REST_API}/resume`);
        setResumeLink(responseData.pdfUrl);
      } catch (error) {}
    };
    getResume();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && !resumeLink && <LoadingSpinner asOverlay={false} />}
      {!isLoading && resumeLink && (
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
                  <h3 className={classes.profession}>SOFTWARE ENGINEER</h3>
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
                      href="https://www.lancestasinski.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.lancestasinski.com
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
                        <p>M.S. - Biology and Ecology</p>
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
                        <p>Nanodegree - Front End Web Development</p>
                        <p>
                          <b>Udacity</b>
                        </p>
                        <div className={classes["education-section-div"]}>
                          <img src={calendarIcon} alt="Calendar icon" />
                          <p>March 2021 - July 2021</p>
                        </div>
                        <div className={classes["education-section-div"]}>
                          <img src={locationIcon} alt="Location icon" />
                          <p>Remote</p>
                        </div>
                      </li>
                    </ul>
                  </SkillsSection>
                  <SkillsSection heading="SKILLS">
                    <ul className={classes["skill-list"]}>
                      <CodingSkill experience={90} skillName="JavaScript" />
                      <CodingSkill experience={80} skillName="TypeScript" />
                      <CodingSkill experience={90} skillName="HTML5" />
                      <CodingSkill experience={85} skillName="CSS3" />
                      <CodingSkill experience={75} skillName="SASS" />
                      <CodingSkill experience={85} skillName="React" />
                      <CodingSkill experience={75} skillName="Node" />
                      <CodingSkill experience={75} skillName="Express" />
                      <CodingSkill experience={60} skillName="MongoDB" />
                      <CodingSkill experience={80} skillName="Jest" />
                      <CodingSkill experience={50} skillName="Mocha" />
                      <CodingSkill experience={50} skillName="Chai" />
                      <CodingSkill experience={85} skillName="Git" />
                      <CodingSkill experience={60} skillName="Figma" />
                      <CodingSkill experience={25} skillName="AWS" />
                      <CodingSkill experience={30} skillName="Python" />
                      <CodingSkill experience={20} skillName="Java" />
                      <CodingSkill experience={80} skillName="R" />
                    </ul>
                  </SkillsSection>
                </section>
                <section className={classes.main}>
                  <div className={classes.summary}>
                    <h3>SUMMARY</h3>
                    <p>
                      Dedicated software engineer with more than two years of
                      programming experience. Fast learner with strong
                      communication and quantitive skills aquired from a
                      background in biological research.
                    </p>
                  </div>
                  <div>
                    <h3>PROJECTS</h3>
                    <ul className={classes["project-item"]}>
                      <li>
                        <h4>
                          Personal Website and Blog -{" "}
                          <span>Designer, Developer</span>
                        </h4>
                        <ul className={classes["project-description"]}>
                          <li>
                            Developed frontend as an SPA using React, React
                            Router, TypeScript, and CSS modules. Pages designed
                            with Figma.
                          </li>
                          <li>
                            Created a dynamic form that accepts various data
                            types to construct a post. Data is parsed on a
                            Node/Express REST API. String data is stored in a
                            MongoDB collection and images are stored in an AWS
                            S3 bucket. Comments from different users are stored
                            in a MongoDB collection and websockets are used to
                            update the frontend in real time.
                          </li>
                          <li>
                            Served most portfolio projects via the Node server.
                          </li>
                          <li>
                            Deployed on Heroku at{" "}
                            <a
                              className={classes["project-link"]}
                              href="https://www.lancestasinski.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              www.lancestasinski.com
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h4>
                          Weather Journal - <span>Designer, Developer</span>
                        </h4>
                        <ul className={classes["project-description"]}>
                          <li>
                            Developed responsive SPA with React, TypeScript,
                            React Router, styled components, and the useContext
                            hook.
                          </li>
                          <li>
                            Built backend REST API with Node/Express and
                            MongoDB. Users have access to complete CRUD
                            opeartions. Weather data is retrieved using POST
                            requests to OpenWeatherMap via axios.
                          </li>
                          <li>
                            Users can create journal entries that combine a text
                            entry with weather data from their desired ZIP code.
                            The ZIP code and measurement units can be changed at
                            any time.
                          </li>
                          <li>
                            Deployed on Heroku at{" "}
                            <a
                              className={classes["project-link"]}
                              href="https://www.lancestasinski.com/weather-journal-app/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              www.lancestasinski.com/weather-journal-app
                            </a>
                            .
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div style={{marginTop: '1rem'}}>
                    <h3>EXPERIENCE</h3>
                    <ul className={classes["project-item"]}>
                      <li>
                        <h4>
                          Graduate Assistant - <span>University of Maine</span>
                        </h4>
                        <p className={classes["experience-date"]}>
                          September 2019 - December 2021
                        </p>
                        <ul className={classes["project-description"]}>
                          <li>
                            Conducted machine learning analyses to classify
                            individual plants into genomically defined
                            populations from high dimensional datasets using the
                            R statistical programming language.
                          </li>
                          <li>
                            Collaborated with and led a team of reseachers to
                            achieve research and timeline goals prescribed by
                            grants funding the project and journal editors.
                          </li>
                          <li>
                            Published paper titled{" "}
                            <i>
                              Reading light: Leaf spectra capture fine-scale
                              diversity of closely related, hybridizing arctic
                              shrubs
                            </i>{" "}
                            published in{" "}
                            <a
                              className={classes["project-link"]}
                              href="https://nph.onlinelibrary.wiley.com/doi/full/10.1111/nph.17731"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              New Phytologist
                            </a>
                            . Study featured by{" "}
                            <a
                              className={classes["project-link"]}
                              href="https://edition.cnn.com/2021/10/19/world/ray-guns-plants-biodiversity-climate-scn/index.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              CNN
                            </a>
                            .
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className={classes.download}>
            <button>
              <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Resume;
