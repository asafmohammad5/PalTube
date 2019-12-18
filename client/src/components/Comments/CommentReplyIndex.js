import React from 'react';
import CommentReplyItem from "./CommentReplyItem";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';

const { FETCH_VIDEO} = Queries;

class CommentReplyIndex extends React.Component {
  
  render() {
    return <Query query={FETCH_VIDEO} variables={{ id: this.props.videoId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
      
       const comments = data.video.comments;

       let comment;
       for (let i = 0; i < comments.length; i++) {
         if (this.props.commentId === comments[i]._id) {
            comment = comments[i].replies;
         }
       }
     
         const replies = comment.map(reply => {
            return <div>
             <div><CommentReplyItem comment={reply} videoId={this.props.videoId} parentId={this.props.commentId}/> </div>
            </div>
        })
       
     return (
       <div>
       {replies}
       </div>
     )
      }}
    </Query>
  }
}

export default CommentReplyIndex;
