import React from "react";

import classes from "./CodingSkill.module.css";

const CodingSkill: React.FC<{ skillName: string; experience: number }> = (
  props
) => {
  return (
    <div className={classes["coding-skill"]}>
      <p className={classes.skill}>{props.skillName}</p>
      <div className={classes["experience-bar"]}>
        <div
          className={classes.experience}
          style={{ width: `${props.experience}%` }}
        ></div>
        <div className={classes.dot}></div>
        <div
          className={classes.remainder}
          style={{ width: `${100 - props.experience}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CodingSkill;
