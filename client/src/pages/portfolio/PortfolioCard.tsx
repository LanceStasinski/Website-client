import React from "react";
import { Link } from "react-router-dom";

import classes from "./PortfolioCard.module.css";
import Card from "../../shared/components/UIElements/Card";
import githubIcon from "../../assets/social-icons/github2.png";

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
    <Card className={classes['project-card']}>
      <img
        className={classes["project-thumbnail"]}
        src={props.image}
        alt={props.title}
      />
      <div className={classes["project-info"]}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p><b>Technologies used:</b> {props.technologies}</p>
      </div>
      <div className={classes["project-links"]}>
        {props.external && (
          <a href={props.projectUrl}>
            <button>Visit</button>
          </a>
        )}
        {!props.external && (
          <Link to={props.projectUrl}>
            <button>Visit</button>
          </Link>
        )}

        <a href={props.gitHubLink} className={classes.github}>
          <img src={githubIcon} alt="Github icon" />
        </a>
      </div>
    </Card>
  );
};

export default PortfolioCard;
