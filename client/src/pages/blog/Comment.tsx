import React, { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Comment.module.css";

interface Props {
  userId: string;
  text: string;
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

  return (
    <div>
      {!isEditing && <p>{props.children}</p>}
      {authCtx.isLoggedIn && authCtx.userId === props.userId && (
        <div>
          <button type="button" onClick={editHandler}>
            EDIT
          </button>
          <button type="button" onClick={deleteCommentHandler}>
            Delete
          </button>
        </div>
      )}
      {isEditing && authCtx.userId === props.userId && (
        <form onSubmit={updateCommentHandler}>
          <input type="text">{props.text}</input>
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
