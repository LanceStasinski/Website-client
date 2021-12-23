import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./Blog.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import BlogList from "./BlogList";

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;
const REST_API = process.env.REACT_APP_REST_API;

export interface PostHeading {
  _id: string;
  title: string;
  blurb: string;
  tags: string;
  headImg: string;
  headImgCaption: string;
  headImgAlt: string;
  month: string;
  day: string | number;
  year: string | number;
}

const Blog: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.token && authCtx.userId === ADMIN_USER;
  const [loadedPosts, setLoadedPosts] = useState<PostHeading[]>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const responseData = await sendRequest(`${REST_API}/blog/posts`);
        setLoadedPosts(responseData.posts);
        console.log(responseData)
      } catch (error) {}
    };
    getPosts();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.blog}>
        <h2>BLOG</h2>
        <hr />
        {isLoading && <LoadingSpinner asOverlay={false} />}
        {!isLoading && <BlogList posts={loadedPosts} />}
        {isAdmin && (
          <div className={classes["add-post"]}>
            <Link to="/blog/create">Add Post</Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Blog;
