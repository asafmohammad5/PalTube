import React from 'react';
import CommentIndexItem from "./CommentIndexItem";

class CommentIndex extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      comments: this.props.comments
    }
  }
  render () {
    const comments = this.state.comments.map(comment => {
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

