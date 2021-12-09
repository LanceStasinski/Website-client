import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./CommentSection.module.css";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

interface CommentInterface {
  comment: string;
  creatorId: string;
  postId: string;
  username: string;
  __V: number;
  _id: string;
}

interface Props {
  postId: string;
  comments: CommentInterface[];
}

interface CommentInput {
  newComment: string;
}

const REST_API = process.env.REACT_APP_REST_API;

const CommentSection: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedComments, setLoadedComments] = useState(props.comments);

  const deleteCommentHandler = async (commentId: string) => {
    try {
      await sendRequest(
        `${REST_API}/blog/comment/${commentId}`,
        "DELETE",
        {},
        { Authorization: "Bearer " + authCtx.token }
      );
      setLoadedComments((prevComments) =>
        prevComments!.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {}
  };

  const postCommentHandler = async (commentData: { newComment: string }) => {
    try {
      const responseData = await sendRequest(
        `${REST_API}/blog/comment`,
        "POST",
        JSON.stringify({
          newComment: commentData.newComment,
          userId: authCtx.userId,
          postId: props.postId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        }
      );
      setLoadedComments((prevComments) => [
        ...prevComments,
        responseData.createdComment,
      ]);
    } catch (error) {}
  };

  const {
    register,
    reset,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    postCommentHandler(data);
    reset({ newComment: null });
  };

  let placeholder = !authCtx.isLoggedIn
    ? "Login to add a comment."
    : authCtx.isLoggedIn && loadedComments.length === 0
    ? "Be the first to add a comment..."
    : "Add a comment...";

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className={classes["comment-section"]}>
        <header>
          <h3>Comments</h3>
        </header>
        {isLoading && <LoadingSpinner asOverlay/>}
        <div>
          <ul>
            {loadedComments.map((comment) => {
              return (
                <li key={comment._id}>
                  <Comment
                    userName={comment.username}
                    userId={comment.creatorId}
                    commentId={comment._id}
                    onDelete={deleteCommentHandler}
                  >
                    {comment.comment}
                  </Comment>
                </li>
              );
            })}
          </ul>
        </div>
        {loadedComments.length > 0 && <hr />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("newComment", { required: true })}
            placeholder={placeholder}
          />
          {authCtx.isLoggedIn ? (
            <Button type="submit" disabled={!isValid}>
              submit
            </Button>
          ) : (
            <Link to="/auth">LOGIN</Link>
          )}
        </form>
      </Card>
    </React.Fragment>
  );
};

export default CommentSection;
