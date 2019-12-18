import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";

const { FETCH_VIDEO } = Queries;
const { DELETE_COMMENT } = Mutations;

class CommentDelete extends React.Component {
  
  handleSubmit(e, deleteComment) {
    e.preventDefault();

    deleteComment({
      variables: {
      id: this.props.commentId
      }
    })
      .then(data => {
       console.log("Comment deleted")
      })
  }

 
  render() {
    const user = currentUser();

    if (!user) {
      return <div></div>
    } else if (this.props.user === currentUser().username) {
    return (
      <Mutation
        mutation={DELETE_COMMENT}
        refetchQueries={() => {
          return [
            {
              query: FETCH_VIDEO, variables: { id: this.props.videoId }
            }
          ];
        }}
      >
        {(deleteComment, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, deleteComment)}>
              <button type="submit">Delete</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  } else {
    return <div></div>
  }
  }
}

export default CommentDelete;
