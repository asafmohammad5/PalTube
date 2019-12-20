import React from 'react';
import CommentReplyIndex from "./CommentReplyIndex";
import CommentReplyCreate from "./CommentReplyCreate";
import CommentRootDelete from "./CommentRootDelete";
import EditComment from "./EditComment";


const handleToggle = (e, commentName) => {
  e.preventDefault();
 
  let commentOptions = document.getElementById(commentName);

  if (commentOptions) {
    commentOptions.classList.toggle("show");
  }
}


const CommentIndexItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const commentName = props.comment._id; 
   

  const profileSrc = props.comment.author.image ? props.comment.author.image: "/stylesheets/images/default_avatar_2.png";
  const gif = props.comment.gif ? <img alt={props.comment.text} className="main-comment-gif" src={props.comment.gif} />: null

  

  if (props.comment.text !== "!(!DELETE!)!" ) {
    debugger; 
    return (
          <div className="main-comment-index">
           <div className="main-comment-top">
              <img src={profileSrc} className="comment-create-avatar" />
              <div className="main-comment-name">{props.comment.author.username}</div>
              <div className="edit-comment">
                <div className="main-comment-year">{year + "-" + month + "-" + day }</div>
                <div className="options-popup">
              <i onClick={(e) => handleToggle(e, commentName)} className="fas fa-ellipsis-h edit-button"></i>
                <div className="optionstext" id={commentName}>{commentName}HIIIII</div>
              </div>
              </div>
           </div>
            <div className="main-comment-text">{props.comment.text}</div>
            {gif}
            {/* <div className="comment-index-reply"><CommentReplyCreate parentId={props.comment._id} videoId={props.videoId}/></div>
            <div className="comment-index-item-delete"><CommentRootDelete comment={props.comment} commentId={props.comment._id} videoId={props.videoId} user={props.comment.author.username} /></div>
            <div className="comment-index-item-edit"><EditComment videoId={props.videoId} comment={props.comment} /></div>
            <div className="comment-reply-index"><CommentReplyIndex commentId={props.comment._id} videoId={props.videoId}/></div> */}
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