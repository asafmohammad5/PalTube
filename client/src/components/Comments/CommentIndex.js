import React from 'react';
import CommentIndexItem from "./CommentIndexItem";
import {Query} from "react-apollo";
import Queries from '../../graphql/queries';

const { FETCH_VIDEO } = Queries;

class CommentIndex extends React.Component {
  constructor(props) {
    super(props) 
  }
  render () {
  
   return <Query query={FETCH_VIDEO} variables={{ id: this.props.videoId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
      
       const comments = data.video.comments.map(comment => {
         return <div>
           <div><CommentIndexItem comment={comment} videoId={this.props.videoId}/> </div>
         </div>
       })
    return <div>
            {comments}
           </div>

  }}
  </Query>
  }
}

export default CommentIndex;

