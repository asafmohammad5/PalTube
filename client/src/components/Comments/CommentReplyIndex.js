import React from 'react';
import CommentReplyItem from "./CommentReplyItem";

class CommentReplyIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: this.props.comments
    }
  }
  render() {
    const comments = this.state.comments.map(comment => {
      return <div>
        <div><CommentReplyItem comment={comment} /> </div>
      </div>
    })
    return <div>
      {comments}
    </div>
  }
}

export default CommentReplyIndex;
