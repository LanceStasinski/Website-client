import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Comment.module.css";

interface Props {
  userId: string;
  commentId: string;
  userName: string;
  onDelete: (commentId: string) => Promise<void>;
}

const Comment: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);

  const deleteComment = () => {
    props.onDelete(props.commentId);
  };

  return (
    <React.Fragment>
      <div className={classes["comment-wrapper"]}>
        <div className={classes.comment}>
          <div className={classes["comment-single"]}>
            <h3>{props.userName}</h3>
            <p>{props.children}</p>
          </div>
        </div>
        {authCtx.isLoggedIn && props.userId === authCtx.userId && (
          <div className={classes["delete-btn"]}>
            <button type="button" onClick={deleteComment}>
              Delete
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Comment;
