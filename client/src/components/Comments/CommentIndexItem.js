import React from 'react';
import CommentReplyIndex from "./CommentReplyIndex";
import CommentReplyCreate from "./CommentReplyCreate";
import CommentRootDelete from "./CommentRootDelete";
import EditComment from "./EditComment";


const CommentIndexItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()

  if (props.comment.text !== "!(!DELETE!)!" ) {
    return (
          <div className="main-comment-index">
           <div className="main-comment-top">
              <div className="main-comment-name">{props.comment.author.username}</div>
              <div className="main-comment-year">{year + "-" + month + "-" + day }</div>
           </div>
            <div className="main-comment-text">{props.comment.text}</div>
            <div><CommentReplyCreate parentId={props.comment._id} videoId={props.videoId}/></div>
            <div className="comment-index-item-delete"><CommentRootDelete commentId={props.comment._id} videoId={props.videoId} user={props.comment.author.username} /></div>
            <div className="comment-index-item-edit"><EditComment videoId={props.videoId} comment={props.comment} /></div>
            <div className="comment-reply-index"><CommentReplyIndex commentId={props.comment._id} videoId={props.videoId}/></div>
          </div>
  )
    } else {
      return (
        <div>
          <div className="deleted-comment">Comment has been deleted</div>
          <div className="comment-reply-index"><CommentReplyIndex commentId={props.comment._id} videoId={props.videoId} /></div>
        </div>
      )
    }
}

export default CommentIndexItem;