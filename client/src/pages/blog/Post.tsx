import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Highlight from "react-highlight";

import classes from "./Post.module.css";
import CommentSection from "./CommentSection";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const REST_API = process.env.REACT_APP_REST_API;

const DUMMY_COMMENTS = [
  {
    commentId: "c1",
    username: "user1",
    userId: "u1",
    text: "This is the first comment",
  },
  {
    commentId: "c2",
    username: "user2",
    userId: "u2",
    text: "This is the second comment. A long long long long long long long long long long long long long long long long long long long long long long long long long long long  comment.",
  },
];

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
  comments: any[];
}

const Post: React.FC = () => {
  const postId = useParams<{ postId: string }>().postId;
  const [loadedPost, setLoadedPost] = useState<PostInfo>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
          <section>
            <CommentSection
              postId={postId}
              comments={DUMMY_COMMENTS}
            ></CommentSection>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};
export default Post;
