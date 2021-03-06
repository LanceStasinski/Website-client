import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import classes from "./BlogList.module.css";
import { PostHeading } from "./Blog";

const BlogList: React.FC<{ posts: PostHeading[] | undefined }> = (props) => {
  if (!props.posts || props.posts?.length === 0) {
    return (
      <Card className={classes["blog-404"]}>
        <h2>No posts found.</h2>
      </Card>
    );
  }

  return (
    <ul className={classes.posts}>
      {props.posts.map((post, index) => {
        return (
          <li key={post._id}
          className={classes.post}
          style={
            index % 2
              ? {
                  animation: "slideInRight 1s ease-out forwards",
                  animationDelay: `${
                    (props.posts!.length - 1 - index) * 0.25
                  }s`,
                  animationIterationCount: '1'
                }
              : {
                  animation: "slideInLeft 1s ease-out forwards",
                  animationDelay: `${
                    (props.posts!.length - 1 - index) * 0.25
                  }s`,
                }
          }>
            <Link to={`/blog/post/${post.title.replace(/\s/g, "-")}`}>
              <Card
                className={classes["blog-card"]}

              >
                <div
                  className={
                    index % 2 === 0
                      ? classes["post-info"]
                      : classes["post-info-reverse"]
                  }
                >
                  <img
                    src={post.headImg}
                    alt={post.headImgAlt}
                    className={classes["post-img"]}
                  />
                  <article>
                    <h2 className={classes["blog-title"]}>{post.title}</h2>
                    <p>{post.blurb}</p>
                    <time
                      dateTime={new Date(
                        `${post.month} ${post.day}, ${post.year}`
                      ).toString()}
                      className={classes["post-date"]}
                    >{`${post.month} ${post.day}, ${post.year}`}</time>
                    <div className={classes.tags}>
                      {post.tags.split(", ").map((tag, index) => (
                        <div className={classes.tag} key={`tag${index}`}>
                          {tag.toLowerCase()}
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default BlogList;
