import React from "react";

import classes from "./CodingSkill.module.css";

const CodingSkill: React.FC<{ skillName: string; experience: number }> = (
  props
) => {
  const expand =`
    @keyframes expand {
      from {width: 0%;}
      to {width: 100%;}
    }
  `;
  return (
    <li className={classes["coding-skill"]}>
      <p className={classes.skill}>{props.skillName}</p>
      <div className={classes["experience-bar"]}>
        <div className={classes["experience-bar-inner"]}>
          <style children={expand} />
          <div
            className={classes["experience-bar-fill"]}
            style={{
              maxWidth: `${props.experience}%`,
              animationName: "expand",
              animationDuration: "1s",
              animationTimingFunction: "ease",
              animationFillMode: "forwards",
            }}
          ></div>
          <div className={classes.dot}></div>
        </div>
      </div>
    </li>
  );
};

export default CodingSkill;
