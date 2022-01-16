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
    <nav className={classes["post-links"]}>
      <ul>
        <li>
          <NavLink to={"/blog"} activeClassName={classes["active-link"]} exact>
            Blog Home
          </NavLink>
        </li>
        {props.posts.map((post) => {
          return (
            <li key={post._id}>
              <NavLink
                to={`${post.title.replace(/\s/g, '-')}`}
                activeClassName={classes["active-link"]}
                exact
              >
                {post.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PostLinks;
