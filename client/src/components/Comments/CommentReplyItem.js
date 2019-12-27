import React from 'react';
import ReplyCommentCreate from "./ReplyCommentCreate";
import CommentDelete from "./CommentDelete";
import EditComment from "./EditComment";
import {Link} from "react-router-dom";
import { currentUser } from '../../util/util';

const handleToggle = (e, commentName) => {
  e.preventDefault();

  let commentOptions = document.getElementById(commentName);

  if (commentOptions) {
    commentOptions.classList.toggle("show");
  }
}

const editOptions = (author, props) => {
  const commentName = props.comment._id;

  if (currentUser() && currentUser().username === author) {
    return (
      <div className="options-popup">
        <i onClick={(e) => handleToggle(e, commentName)} className="fas fa-ellipsis-h edit-button-font"></i>
        <div className="optionstext" id={commentName}>
          <EditComment videoId={props.videoId} comment={props.comment} />
          <CommentDelete commentId={props.comment._id} videoId={props.videoId} user={props.comment.author.username} />
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const CommentReplyItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()
    const author = props.comment.author.username; 

    const num = props.comment.replyTo ? props.comment.text.split(" ")[0].length : 0;
    const name = props.comment.replyTo ? "@" + props.comment.text.split(" ")[0] : "";
    const link = props.comment.replyTo ? <div className="comment-reply-link-item"><Link to={`/profile/${props.comment.replyTo}`}><div className="comment-reply-link">{name}</div></Link> <div className="comment-reply-link-text">{props.comment.text.slice(num)}</div></div> : <div>{props.comment.text}</div>;
    const profileSrc = props.comment.author.image ? props.comment.author.image : "/stylesheets/images/default_avatar_2.png";
    const gif = props.comment.gif ? <img alt="comment" className="reply-comment-gif" src={props.comment.gif} /> : null

    
    return (
  
          <div className="reply-comment-index">
            <div className="reply-comment-top">
              <img src={profileSrc} className="reply-comment-create-avatar" />
              <div className="reply-comment-name">{props.comment.author.username}</div>
            <div className="edit-comment">
              <div className="reply-comment-year">{year + "-" + month + "-" + day}</div>
              {editOptions(author, props)}
            </div>
            </div>
              <div className="reply-comment-text">{link}</div>
              {gif}
            <div className="comment-reply-reply"><ReplyCommentCreate videoId={props.videoId} parentId={props.parentId} replyTo={props.comment.author._id} user={props.comment.author.username}/></div> 
           

           </div>
        )
}

export default CommentReplyItem;