import React from 'react';
import CommentReplyIndex from "./CommentReplyIndex";
import CommentReplyCreate from "./CommentReplyCreate";


const CommentIndexItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()
    // const comments = props.comment.replies.length > 0 ? props.comment.replies : [];

    return (
  
          <div>
            <div>{props.comment.author.username}</div>
            <div>{year + "-" + month + "-" + day }</div>
            <div>{props.comment.text}</div>
            <div><CommentReplyCreate parentId={props.comment._id} videoId={props.videoId}/></div>
            <div className="comment-reply-index"><CommentReplyIndex commentId={props.comment._id} videoId={props.videoId}/></div>
          </div>
  
  )
}

export default CommentIndexItem;