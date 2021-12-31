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
import DisplayHTML from "./DisplayHTML";

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
  _id: string;
  title: string;
  blurb: string;
  tags: string;
  headImg: string;
  headImgCaption: string;
  headImgAlt: string;
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
    caption?: string;
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

interface PostData {
  title: string;
  _id: string;
}

const Post: React.FC = () => {
  const postTitle = useParams<{ postId: string }>().postId;
  const [loadedPost, setLoadedPost] = useState<PostInfo>();
  const [loadedComments, setLoadedComments] = useState<Comment[]>([]);
  const [loadedPostLinks, setLoadedPostLinks] = useState<PostData[]>([]);
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
          `${REST_API}/blog/posts/${postTitle.replaceAll("-", " ")}`
        );
        setLoadedPost(responseData.post);
        document.title = responseData.post.title || "Post Not Found";
        setLoadedPostLinks(responseData.posts);
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
  }, [sendRequest, postTitle]);

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
            postId: loadedPost?._id,
            date: new Date().toLocaleDateString(),
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          }
        );
      } catch (error) {}
    },
    [authCtx.token, authCtx.userId, loadedPost?._id, sendRequest]
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
        `${REST_API}/blog/delete/${loadedPost?._id}`,
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
      loadedPost!._id,
      loadedPost!.title,
      loadedPost!.blurb,
      loadedPost!.tags,
      loadedPost!.headImg,
      loadedPost!.headImgCaption,
      loadedPost!.headImgAlt,
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
      {!isLoading && loadedPost && (
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
          <PostLinksDrawer
            onHoverAway={hideLinksHandler}
            onClick={hideLinksHandler}
            show={showLinks}
          >
            <PostLinks posts={loadedPostLinks} />
          </PostLinksDrawer>
          <div className={classes.post}>
            <header>
              <div className={classes["header-text"]}>
                <h2 id="title" >{loadedPost!.title}</h2>
                <div className={classes.dates}>
                  <time
                    className={classes["created-date"]}
                    dateTime={new Date(
                      `${loadedPost.month} ${loadedPost.day}, ${loadedPost.year}`
                    ).toString()}
                  >{`${loadedPost.month} ${loadedPost.day}, ${loadedPost.year}`}</time>
                  {loadedPost.updatedMonth &&
                    !(
                      loadedPost.month === loadedPost.updatedMonth &&
                      loadedPost.day === loadedPost.updatedDay &&
                      loadedPost.year === loadedPost.updatedYear
                    ) && (
                      <p className={classes["updated-date"]}>
                        Updated{" "}
                        <time
                          dateTime={new Date(
                            `${loadedPost.updatedMonth} ${loadedPost.updatedDay}, ${loadedPost.updatedYear}`
                          ).toString()}
                        >{`${loadedPost.updatedMonth} ${loadedPost.updatedDay}, ${loadedPost.updatedYear}`}</time>
                      </p>
                    )}
                </div>
              </div>

              <div className={classes.tags}>
                {loadedPost.tags.split(", ").map((tag, index) => (
                  <div key={`tag${index}`} className={classes.tag}>
                    {tag.toLowerCase()}
                  </div>
                ))}
              </div>

              <img
                src={loadedPost.headImg}
                alt={loadedPost.headImgAlt}
                className={classes.headImg}
              ></img>
              <p className={classes.caption}>{loadedPost.headImgCaption}</p>
            </header>
            <article>
              {loadedPost!.content.map((ct) => {
                if (ct.type === "paragraph") {
                  return (
                    <DisplayHTML
                      key={ct._id}
                      className={classes["content-paragraph"]}
                      text={ct.text}
                    />
                  );
                } else if (ct.type === "image" || ct.type === "imageUrl") {
                  return (
                    <React.Fragment>
                      <img src={ct.text} alt={ct.alt} key={ct._id} />
                      <p className={classes.caption}>{ct.caption}</p>
                    </React.Fragment>
                  );
                } else if (ct.type === "heading") {
                  return (
                    <h3 className={classes["content-header"]} key={ct._id}>
                      {ct.text}
                    </h3>
                  );
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
              <section className={classes.references}>
                <h3>Further Reading</h3>
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
              </section>
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
                postId={loadedPost._id}
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
