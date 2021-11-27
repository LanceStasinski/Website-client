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
    <div className={classes.comment}>
      {!isEditing && <div className={classes['comment-single']}><h3>{props.userName}</h3><p>{props.children}</p></div>}
      {authCtx.isLoggedIn && props.userId === authCtx.userId && (
        <div>
          <button type="button" onClick={editHandler}>
            EDIT
          </button>
          <button type="button" onClick={deleteCommentHandler}>
            Delete
          </button>
        </div>
      )}
      {isEditing && props.userId === authCtx.userId && (
        <form onSubmit={updateCommentHandler}>
          <input type="text">{props.children}</input>
          <div>
            <button type="submit">SUBMIT</button>
            <button type="button" onClick={cancelEditHandler}>
              CANCEL
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
