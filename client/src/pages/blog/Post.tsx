import React from "react";

import Card from "../../shared/components/UIElements/Card";
import classes from './Post.module.css'

interface PostInfo {
  title: string;
  date: Date;
  content: {
    type: string;
    content: string;
    alt?: string;
  }[];
  citation: { text: string; linkUrl?: string };
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Post: React.FC<PostInfo> = (props) => {
  const date = new Date(props.date);

  return (
    <Card className={classes.post}>
      <header>
        <h2>{props.title}</h2>
        <h2>{`${
          MONTHS[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`}</h2>
      </header>
      <footer>
        <i className={classes.chevron}/>
      </footer>
    </Card>
  );
};

export default Post;
