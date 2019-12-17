import React from 'react';
import Queries from '../../graphql/queries';
import { Query } from "react-apollo";
import ReplyCommentCreate from "./ReplyCommentCreate";
import { currentUser } from "../../util/util";

const { FETCH_COMMENT } = Queries;

const CommentReplyItem = props => {
    const date = new Date(+props.comment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()
    
    return (
    // <Query query={FETCH_COMMENT} variables={{ id: props.comment._id }}>
    //   {({ loading, error, data }) => {
    //     if (loading) return <p>Loading...</p>;
    //     if (error) return <p>Error</p>;


        // return (
          <div>
            <div>{props.comment.author.username}</div>
            <div>{year + "-" + month + "-" + day}</div>
            <div>{props.comment.text}</div>
            <div><ReplyCommentCreate videoId={props.videoId} parentId={props.parentId} user={props.comment.author.username}/></div>
           
          </div>
        )
    //   }}
    // </Query>
  // )
}

export default CommentReplyItem;