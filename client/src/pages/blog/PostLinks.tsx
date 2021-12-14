import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./PostLinks.module.css";

interface Props {
  posts: {
    title: string;
    _id: string;
  }[];
}
const PostLinks: React.FC<Props> = (props) => {
  return (
    <aside className={classes["post-links"]}>
      <ul>
        <li>
          <NavLink to={"/blog"}>Blog Home</NavLink>
        </li>
        {props.posts.map((post) => {
          return (
            <li key={post._id}>
              <NavLink to={`blog/post/${post._id}`}>{post.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default PostLinks;
