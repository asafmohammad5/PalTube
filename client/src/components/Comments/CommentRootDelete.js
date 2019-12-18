import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";

const { FETCH_VIDEO } = Queries;
const { UPDATE_COMMENT } = Mutations;

class CommentRootDelete extends React.Component {
 
  handleSubmit(e, updateComment) {
    e.preventDefault();
    updateComment({
      variables: {
        id: this.props.commentId,
        text: "!(!DELETE!)!"
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
          mutation={UPDATE_COMMENT}
          refetchQueries={() => {
            return [
              {
                query: FETCH_VIDEO, variables: { id: this.props.videoId }
              }
            ];
          }}
        >
          {(updateComment, { data }) => (
            <div>
              <form onSubmit={e => this.handleSubmit(e, updateComment)}>
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

export default CommentRootDelete;
