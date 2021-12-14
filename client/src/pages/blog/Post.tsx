import React, { useState, useEffect, useContext, useCallback } from "react";

import { io } from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";
import Highlight from "react-highlight";

import classes from "./Post.module.css";
import CommentSection from "./CommentSection";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/UIElements/Modal";
import { PostContext } from "../../shared/context/post-context";
import PostLinks from "./PostLinks";
import PostLinksDrawer from "./PostLinksDrawer";
import Backdrop from "../../shared/components/UIElements/Backdrop";

const REST_API = process.env.REACT_APP_REST_API;
const ADMIN = process.env.REACT_APP_ADMIN_USER;
const REST_SERVER = process.env.REACT_APP_REST_SERVER;

interface Comment {
  comment: string;
  creatorId: string;
  postId: string;
  username: string;
  __V: number;
  _id: string;
  date: string;
}

interface PostInfo {
  title: string;
  blurb: string;
  month: string;
  day: string;
  year: string;
  updatedMonth: String;
  updatedDay: String;
  updatedYear: String;
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
  references: {
    authors: string;
    date: string;
    title: string;
    url: string;
    _id: string;
  }[];
  comments: Comment[];
}

const DUMMY_LINKS = [
  { _id: "1", title: "Closures" },
  { _id: "2", title: "How to use the useEffect hook" },
  { _id: "3", title: "Using useReducer" },
  { _id: "4", title: "Object oriented programming" },
  { _id: "5", title: "Lifing up state" },
  { _id: "6", title: "Using aws s3" },
  { _id: "7", title: "Some longer title of stuff and things" },
  { _id: "8", title: "I dont think that a title would get much longer than this but who know. Maybe it'll be this long." },
  { _id: "9", title: "Some other title" },
  { _id: "10", title: "Old blog post" },
  { _id: "11", title: "I dont think that a title would get much longer than this but who know. Maybe it'll be this long." },
  { _id: "12", title: "I dont think that a title would get much longer than this but who know. Maybe it'll be this long." },
  { _id: "13", title: "I dont think that a title would get much longer than this but who know. Maybe it'll be this long." },
  { _id: "14", title: "I dont think that a title would get much longer than this but who know. Maybe it'll be this long." },
];

const Post: React.FC = () => {
  const postId = useParams<{ postId: string }>().postId;
  const [loadedPost, setLoadedPost] = useState<PostInfo>();
  const [loadedComments, setLoadedComments] = useState<Comment[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const postCtx = useContext(PostContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  postCtx.clearContext();

  useEffect(() => {
    const getPost = async () => {
      try {
        const responseData = await sendRequest(
          `${REST_API}/blog/posts/${postId}`
        );
        setLoadedPost(responseData.post);

        setLoadedComments(responseData.post.comments);
        const socket = io(`${REST_SERVER}`);
        socket.on("comments", (data) => {
          if (data.action === "create") {
            addComment(data.comment);
          } else if (data.action === "delete") {
            deleteComment(data.commentId);
          }
        });
      } catch (error) {}
    };
    getPost();
  }, [sendRequest, postId]);

  const addComment = (comment: Comment) => {
    setLoadedComments((prevComments) => [...prevComments!, comment]);
  };

  const deleteComment = (commentId: string) => {
    setLoadedComments((prevComments) =>
      prevComments!.filter((comment) => comment._id !== commentId)
    );
  };

  const addCommentHandler = useCallback(
    async (commentData: { newComment: string }) => {
      try {
        await sendRequest(
          `${REST_API}/blog/comment`,
          "POST",
          JSON.stringify({
            newComment: commentData.newComment,
            userId: authCtx.userId,
            postId: postId,
            date: new Date().toLocaleDateString(),
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          }
        );
      } catch (error) {}
    },
    [authCtx.token, authCtx.userId, postId, sendRequest]
  );

  const deleteCommentHandler = useCallback(
    async (commentId: string) => {
      try {
        await sendRequest(
          `${REST_API}/blog/comment/${commentId}`,
          "DELETE",
          {},
          { Authorization: "Bearer " + authCtx.token }
        );
      } catch (error) {}
    },
    [authCtx.token, sendRequest]
  );

  const deletePostHandler = async () => {
    try {
      await sendRequest(
        `${REST_API}/blog/delete/${postId}`,
        "DELETE",
        {},
        {
          Authorization: "Bearer " + authCtx.token,
        }
      );
      history.push("/blog");
    } catch (error) {}
  };

  const showDeleteWarning = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const editPostHandler = () => {
    postCtx.setContext(
      postId,
      loadedPost!.title,
      loadedPost!.blurb,
      loadedPost!.content,
      loadedPost!.references
    );
    history.push("/blog/create");
  };

  const showLinksHandler = () => {
    setShowLinks(true);
  };

  const hideLinksHandler = () => {
    setShowLinks(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Delete post?"
        footer={
          <React.Fragment>
            <Button type="button" onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button type="button" onClick={deletePostHandler} danger>
              DELETE
            </Button>
          </React.Fragment>
        }
        backdropClass={classes["modal-backdrop"]}
      >
        Are you sure you want to delete this post?
      </Modal>
      {showLinks && <Backdrop onClick={hideLinksHandler} />}
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && !loadedPost && <LoadingSpinner asOverlay />}
      {!isLoading && !loadedPost && (
        <div className={classes["post-not-found-wrapper"]}>
          <Card className={classes["post-not-found"]}>
            <h2>Post Not Found!</h2>
            <Button to="/blog">Back</Button>
          </Card>
        </div>
      )}
      {loadedPost && (
        <div className={classes["post-wrapper"]}>
          {!showLinks && (
            <button
              type="button"
              onMouseEnter={showLinksHandler}
              onClick={showLinksHandler}
              className={classes["open-links"]}
            >
              <i className={classes["chevron"]}></i>
            </button>
          )}
          <PostLinksDrawer onHoverAway={hideLinksHandler} onClick={hideLinksHandler} show={showLinks}>
            <PostLinks posts={DUMMY_LINKS} />
          </PostLinksDrawer>
          <div className={classes.post}>
            <header>
              <h2>{loadedPost!.title}</h2>
              <div className={classes.dates}>
                <h2>{`${loadedPost.month} ${loadedPost.day}, ${loadedPost.year}`}</h2>
                {loadedPost.updatedMonth &&
                  loadedPost.month !== loadedPost.updatedMonth &&
                  loadedPost.day !== loadedPost.updatedDay &&
                  loadedPost.year !== loadedPost.updatedYear && (
                    <p>{`Updated ${loadedPost.updatedMonth} ${loadedPost.updatedDay}, ${loadedPost.updatedYear}`}</p>
                  )}
              </div>
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
                <Button type="button" onClick={editPostHandler}>
                  Edit
                </Button>
                <Button type="button" danger onClick={showDeleteWarning}>
                  Delete
                </Button>
              </div>
            )}
            <section>
              <CommentSection
                postId={postId}
                comments={loadedComments!}
                onDeleteComment={deleteCommentHandler}
                onAddComment={addCommentHandler}
              ></CommentSection>
            </section>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Post;
