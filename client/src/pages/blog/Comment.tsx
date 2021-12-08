import React, { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Comment.module.css";

interface Props {
  userId: string;
  commentId: string;
  userName: string;
}

const Comment: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const updateCommentHandler = () => {
    //post request
  };

  const deleteCommentHandler = () => {
    //DELETE request
  };

  // make sure userId matches userId fetched
  return (
    <div className={classes['comment-wrapper']}>
      <div className={classes.comment}>
        <div className={classes["comment-single"]}>
          <h3>{props.userName}</h3>
          <p>{props.children}</p>
        </div>
      </div>
      {authCtx.isLoggedIn && props.userId === authCtx.userId && (
        <div className={classes['delete-btn']}>
          <button type="button" onClick={deleteCommentHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
