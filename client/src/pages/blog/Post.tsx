import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import Highlight from "react-highlight";

import classes from "./Post.module.css";
import CommentSection from "./CommentSection";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const REST_API = process.env.REACT_APP_REST_API;
const ADMIN = process.env.REACT_APP_ADMIN_USER;

interface Comment {
  comment: string;
  creatorId: string;
  postId: string;
  username: string;
  __V: number;
  _id: string;
}

interface PostInfo {
  title: string;
  month: string;
  day: string;
  year: string;
  content: {
    image?: {
      key: string;
      bucket: string;
    };
    type: string;
    text: string;
    alt?: string;
    language?: string;
    _id: string;
  }[];
  references: { authors: string; date: string; title: string; url: string }[];
  comments: Comment[]
}



const Post: React.FC = () => {
  const postId = useParams<{ postId: string }>().postId;
  const [loadedPost, setLoadedPost] = useState<PostInfo>();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const responseData = await sendRequest(
          `${REST_API}/blog/posts/${postId}`
        );
        setLoadedPost(responseData.post);
      } catch (error) {}
    };
    getPost();
  }, [sendRequest, postId]);



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={false} />}
      {!isLoading && !loadedPost && (
        <div className={classes["post-not-found-wrapper"]}>
          <Card className={classes["post-not-found"]}>
            <h2>Post Not Found!</h2>
            <Button to="/blog">Back</Button>
          </Card>
        </div>
      )}
      {!isLoading && loadedPost && (
        <div className={classes.post}>
          <header>
            <h2>{loadedPost!.title}</h2>
            <h2>{`${loadedPost.month} ${loadedPost.day}, ${loadedPost.year}`}</h2>
          </header>
          <hr />
          <article>
            {loadedPost!.content.map((ct) => {
              if (ct.type === "paragraph") {
                return <p key={ct._id}>{ct.text}</p>;
              } else if (ct.type === "image" || ct.type === "imageUrl") {
                return <img src={ct.text} alt={ct.alt} key={ct._id} />;
              } else if (ct.type === "heading") {
                return <h3 key={ct._id}>{ct.text}</h3>;
              } else if (ct.type === "code") {
                return (
                  <pre key={Math.random()}>
                    <code>
                      <Highlight className={ct.language}>{ct.text}</Highlight>
                    </code>
                  </pre>
                );
              } else {
                return (
                  <div
                    key={Math.random()}
                  >{`Error: Content type ${ct.type} not supported.`}</div>
                );
              }
            })}
            <div>
              <h3>References</h3>
              <ul>
                {loadedPost!.references.map((ref) => {
                  return (
                    <li key={ref.title}>
                      <cite>
                        {ref.authors}. ({ref.date}). <i>{ref.title}</i>.
                        Retrieved from <a href={ref.url}>{ref.url}</a>
                      </cite>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
          {authCtx.userId === ADMIN && (
            <div className={classes["admin-buttons"]}>
              <Button type="button">Edit</Button>
              <Button type="button" danger>
                Delete
              </Button>
            </div>
          )}
          <section>
            <CommentSection
              postId={postId}
              comments={loadedPost.comments}
            ></CommentSection>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};
export default Post;
