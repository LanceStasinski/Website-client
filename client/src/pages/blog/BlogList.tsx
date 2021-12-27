import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import classes from "./BlogList.module.css";
import { PostHeading } from "./Blog";

const BlogList: React.FC<{ posts: PostHeading[] | undefined }> = (props) => {
  if (props.posts?.length === 0) {
    return (
      <Card className={classes["blog-404"]}>
        <h2>No posts found.</h2>
      </Card>
    );
  }

  return (
    <ul className={classes.posts}>
      {props.posts?.map((post, index) => {
        return (
          <li key={post._id}>
            <Link to={`/blog/post/${post.title}`}>
              <Card className={classes["blog-card"]}>
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
                    <h3 className={classes["blog-title"]}>{post.title}</h3>
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
