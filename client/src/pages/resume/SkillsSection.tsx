import React from "react";

import classes from "./SkillsSection.module.css";

const SkillsSection: React.FC<{ heading: string }> = (props) => {
  return (
    <div className={classes["skills-section"]}>
      <h3>{props.heading}</h3>
      {props.children}
    </div>
  );
};

export default SkillsSection;
