import React, { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Comment.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const REST_API = process.env.REACT_APP_REST_API;

interface Props {
  userId: string;
  commentId: string;
  userName: string;
}

const Comment: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteCommentHandler = async () => {
    try {
      await sendRequest(
        `${REST_API}/blog/comment/${props.commentId}`,
        "DELETE",
        {},
        { Authorization: "Bearer " + authCtx.token }
      );
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* {isLoading && <LoadingSpinner asOverlay={true} />} */}
      <div className={classes["comment-wrapper"]}>
        <div className={classes.comment}>
          <div className={classes["comment-single"]}>
            <h3>{props.userName}</h3>
            <p>{props.children}</p>
          </div>
        </div>
        {authCtx.isLoggedIn && props.userId === authCtx.userId && (
          <div className={classes["delete-btn"]}>
            <button type="button" onClick={deleteCommentHandler}>
              Delete
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Comment;
