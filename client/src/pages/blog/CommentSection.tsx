import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./CommentSection.module.css";
import Button from "../../shared/components/FormElements/Button";

interface Props {
  comments: {
    commentId: string;
    username: string;
    userId: string;
    text: string;
  }[];
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
    reset({ newComment: null });
    console.log(data);
  };

  return (
    <Card className={classes["comment-section"]}>
      <header>
        <h3>Comments</h3>
      </header>
      <div>
        <ul>
          {props.comments.map((comment) => {
            return (
              <li key={comment.commentId}>
                <Comment
                  userName={comment.username}
                  userId={comment.userId}
                  commentId={comment.commentId}
                >
                  {comment.text}
                </Comment>
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("newComment", { required: true })}
          placeholder="Add a comment..."
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
  );
};

export default CommentSection;
