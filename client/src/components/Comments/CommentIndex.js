import React from 'react';
import CommentIndexItem from "./CommentIndexItem";
import {Query} from "react-apollo";
import Queries from '../../graphql/queries';

const { FETCH_VIDEO } = Queries;

class CommentIndex extends React.Component {
 

  render () {
  
   return <Query query={FETCH_VIDEO} variables={{ id: this.props.videoId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
      
       const comments = data.video.comments.map((comment) => { 
        
         return <div>
                  <CommentIndexItem comment={comment} videoId={this.props.videoId}/> 
               </div>
          })
      // let comments = [];
      //  for (let i = data.video.comments.length - 1; i >= 0; i--) {
      //    let comment = data.video.comments[i];
      //    comments.push(<div><CommentIndexItem comment={comment} videoId={this.props.videoId} /></div>)
      // }
    return <div className="comment-index">
              {comments}
           </div>

  }}
  </Query>
  }
}

export default CommentIndex;

