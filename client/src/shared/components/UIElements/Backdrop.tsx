import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

const Backdrop: React.FC<{ onClick: () => void ; backdropClass?: string}> = (props) => {
  return ReactDOM.createPortal(
    <div className={`${classes["backdrop"]} ${props.backdropClass}`} onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
