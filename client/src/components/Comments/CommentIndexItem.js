import React from 'react';
import Queries from '../../graphql/queries';
import { Query } from "react-apollo";

const {FETCH_COMMENT} = Queries;



const CommentIndexItem = props => {
  return (
      <Query query={ FETCH_COMMENT } variables={{ id: props.comment._id}}>
        {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

          const date = new Date(+data.comment.date);
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate()
         
        return (
          <div>
            <div>{data.comment.author.username}</div>
            <div>{year + "-" + month + "-" + day }</div>
            <div>{data.comment.text}</div>
          </div>
        )
        }}
      </Query> 
  )
}

export default CommentIndexItem;