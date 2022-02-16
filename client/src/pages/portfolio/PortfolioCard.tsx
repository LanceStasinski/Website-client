import React from "react";

import classes from "./PortfolioCard.module.css";
import Card from "../../shared/components/UIElements/Card";
import githubIcon from "../../assets/social-icons/github2.png";
import Button from "../../shared/components/FormElements/Button";

const PortfolioCard: React.FC<{
  image: string;
  title: string;
  description: string;
  technologies: string;
  gitHubLink: string;
  external: boolean;
  projectUrl: string;
}> = (props) => {
  return (
    <React.Fragment>
      <Card className={classes["project-card"]}>
        <img
          className={classes["project-thumbnail"]}
          src={props.image}
          alt={props.title}
        />
        <div className={classes["project-info"]}>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <p>
            <b>Technologies used:</b> {props.technologies}
          </p>
        </div>
        <div className={classes["project-links"]}>
          {props.external && (
            <Button
              className={classes["project-links-button"]}
              href={props.projectUrl}
            >
              Visit
            </Button>
          )}
          {!props.external && (
            <Button
              className={classes["project-links-button"]}
              to={props.projectUrl}
            >
              More Info
            </Button>
          )}

          <a
            href={props.gitHubLink}
            className={classes.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img title="Github repo" src={githubIcon} alt="Github icon" />
          </a>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PortfolioCard;
