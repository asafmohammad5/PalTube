import React from 'react';
import ReplyCommentCreate from "./ReplyCommentCreate";
import CommentDelete from "./CommentDelete";
import EditComment from "./EditComment";



const CommentReplyItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()


    
    const profileSrc = props.comment.author.image ? props.comment.author.image : "/stylesheets/images/default_avatar_2.png";
    const gif = props.comment.gif ? <img alt="comment" className="main-comment-gif" src={props.comment.gif} /> : null

    
    return (
  
          <div className="reply-comment-index">
            <div className="main-comment-top">
              <img src={profileSrc} className="comment-create-avatar" />
              <div className="main-comment-name">{props.comment.author.username}</div>
              <div className="main-comment-year">{year + "-" + month + "-" + day}</div>
            </div>
              <div className="main-comment-text">{props.comment.text}</div>
              {gif}
            <div className="comment-reply-reply"><ReplyCommentCreate videoId={props.videoId} parentId={props.parentId} user={props.comment.author.username}/></div>
            <br></br>
            <div className="comment-index-item-delete"><CommentDelete commentId={props.comment._id} videoId={props.videoId} user={props.comment.author.username}/></div>
            <div className="comment-index-item-edit"><EditComment videoId={props.videoId} comment={props.comment} /></div>
           
          </div>
        )
}

export default CommentReplyItem;