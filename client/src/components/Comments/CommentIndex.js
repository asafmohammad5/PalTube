import React from 'react';
import CommentIndexItem from "./CommentIndexItem";

class CommentIndex extends React.Component {
  render () {
    const comments = this.props.comments.map(comment => {
      return <div>
               <div><CommentIndexItem comment={comment} /> </div>
            </div>
    })
    return <div>
            {comments}
           </div>
  }
}

export default CommentIndex;

