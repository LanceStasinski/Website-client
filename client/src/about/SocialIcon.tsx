import React from "react";

import classes from "./SocialIcon.module.css";

const SocialIcon: React.FC<{
  imageUrl: string;
  altTxt: string;
  socialLink: string;
}> = (props) => {
  return (
    <a
      href={props.socialLink}
      className={classes["social-background"]}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={props.imageUrl} alt={props.altTxt} />
    </a>
  );
};

export default SocialIcon;
