import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./PortfolioCard.module.css";
import Card from "../../shared/components/UIElements/Card";
import githubIcon from "../../assets/social-icons/github2.png";
import Modal from "../../shared/components/UIElements/Modal";
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
  const [showModal, setShowModal] = useState(false);

  const exitSPAHandler = () => {
    setShowModal(true);
  };

  const cancelExitHandler = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={cancelExitHandler}
        header="NOTICE: LEAVING SPA"
        footer={
          <React.Fragment>
            <Button href={props.projectUrl}>OKAY</Button>
            <Button type="button" onClick={cancelExitHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
        backdropClass={classes["modal-backdrop"]}
      >
        Please note: you are leaving the Single Page Application portion of this
        website.
      </Modal>
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
            <button type="button" onClick={exitSPAHandler}>
              Visit
            </button>
          )}
          {!props.external && (
            <Link to={props.projectUrl}>
              <button>Visit</button>
            </Link>
          )}

          <a
            href={props.gitHubLink}
            className={classes.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="Github icon" />
          </a>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PortfolioCard;
