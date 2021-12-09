import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./CommentSection.module.css";
import Button from "../../shared/components/FormElements/Button";

interface CommentInterface {
  comment: string;
  creatorId: string;
  postId: string;
  username: string;
  __V: number;
  _id: string;
  date: string;
}

interface Props {
  postId: string;
  comments: CommentInterface[];
  onDeleteComment: (commentId: string) => Promise<void>;
  onAddComment: (commentData: { newComment: string }) => Promise<void>;
}

interface CommentInput {
  newComment: string;
}

const CommentSection: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);

  const {
    register,
    reset,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    props.onAddComment(data);
    reset({ newComment: null });
  };

  let placeholder = !authCtx.isLoggedIn
    ? "Login to add a comment."
    : authCtx.isLoggedIn && props.comments.length === 0
    ? "Be the first to add a comment..."
    : "Add a comment...";

  return (
    <React.Fragment>
      <Card className={classes["comment-section"]}>
        <header>
          <h3>Comments</h3>
        </header>
        <div>
          <ul>
            {props.comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <Comment
                    userName={comment.username}
                    userId={comment.creatorId}
                    commentId={comment._id}
                    onDelete={props.onDeleteComment}
                    date={comment.date}
                  >
                    {comment.comment}
                  </Comment>
                </li>
              );
            })}
          </ul>
        </div>
        {props.comments.length > 0 && <hr />}
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
