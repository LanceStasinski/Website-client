import React, { useContext } from "react";

import Comment from "./Comment";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import classes from './CommentSection.module.css'

interface Props {
  comments: { commentId: string; userId: string; text: string }[];
}

const CommentSection: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes['comment-section']}>
      <header>Comments</header>
      <div>
        <ul>
          {props.comments.map((comment) => {
            return (
              <li key={comment.commentId}>
                <Comment userId={comment.userId} commentId={comment.commentId}>
                  {comment.text}
                </Comment>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default CommentSection;
