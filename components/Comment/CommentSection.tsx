import React from "react";
import { NoComments } from "./NoComments";

interface Props {
  comments: any;
}

const CommentSection = ({ comments }: Props) => {
  if (!comments.length) return <NoComments />;
  return <div>CommentSection</div>;
};

export default CommentSection;
