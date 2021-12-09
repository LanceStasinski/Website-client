import React, { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Comment.module.css";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

interface Props {
  userId: string;
  commentId: string;
  userName: string;
  onDelete: (commentId: string) => Promise<void>;
}

const Comment: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteComment = () => {
    props.onDelete(props.commentId);
    setShowConfirmModal(false);
  };

  const showModal = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footer={
          <React.Fragment>
            <Button type="button" onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button type="button" danger onClick={deleteComment}>
              DELETE
            </Button>
          </React.Fragment>
        }
        backdropClass={classes["modal-backdrop"]}
      >
        <p>Do you want to delete this comment? This cannot be undone.</p>
      </Modal>
      <div className={classes["comment-wrapper"]}>
        <div className={classes.comment}>
          <div className={classes["comment-single"]}>
            <h3>{props.userName}</h3>
            <p>{props.children}</p>
          </div>
        </div>
        {authCtx.isLoggedIn && props.userId === authCtx.userId && (
          <div className={classes["delete-btn"]}>
            <button type="button" onClick={showModal}>
              Delete
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Comment;
