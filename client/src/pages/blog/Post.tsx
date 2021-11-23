import React, { useState } from "react";

import Highlight from "react-highlight";

import Card from "../../shared/components/UIElements/Card";
import classes from "./Post.module.css";

interface PostInfo {
  title: string;
  date: Date;
  content: {
    type: string;
    content: string;
    alt?: string;
    language?: string;
  }[];
  references: { authors: string; date: string; title: string; url: string }[];
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
  const [displayInfo, setDisplayInfo] = useState(false);

  const expandHandler = () => {
    setDisplayInfo((prevState) => !prevState);
  };

  const content = (
    <article>
      {props.content.map((ct) => {
        if (ct.type === "paragraph") {
          return <p>{ct.content}</p>;
        } else if (ct.type === "image") {
          return <img src={ct.content} alt={ct.alt} />;
        } else if (ct.type === "heading") {
          return <h4>{ct.content}</h4>;
        } else if (ct.type === "code") {
          return (
            <pre>
              <code>
                <Highlight className={ct.language}>{ct.content}</Highlight>
              </code>
            </pre>
          );
        } else {
          return <div>{`Error: Content type ${ct.type} not supported.`}</div>;
        }
      })}
      <div>
        <h4>References</h4>
        <ul>
          {props.references.map((ref) => {
            return (
              <li>
                <cite>
                  {ref.authors}. ({ref.date}). <i>{ref.title}</i>. Retrieved
                  from <a href={ref.url}>{ref.url}</a>
                </cite>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );

  return (
    <Card className={classes.post}>
      <header>
        <h3>{props.title}</h3>
        <h3>{`${
          MONTHS[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`}</h3>
      </header>
      {displayInfo && content}
      <footer onClick={expandHandler}>
        <i
          className={
            displayInfo ? classes["chevron-down"] : classes["chevron-up"]
          }
        />
      </footer>
    </Card>
  );
};

export default Post;
