import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";
  
const { FETCH_VIDEO } = Queries;
const { UPDATE_COMMENT, DELETE_COMMENT } = Mutations;

class CommentRootDelete extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmitToggle = this.handleSubmitToggle.bind(this)
  }

 
  handleSubmit(e, updateComment) {
    e.preventDefault();

    updateComment({
      variables: {
        id: this.props.commentId,
        text: "!(!DELETE!)!"
      }
    }) 
  }

  handleSubmitToggle(optionsName) {
    var options = document.getElementById(optionsName);

    if (options && options.classList.contains("show")) {
      options.classList.toggle("show");
    }
  }


  handleSubmit2(e, deleteComment) {
    e.preventDefault();

    deleteComment({
      variables: {
        id: this.props.commentId
      }
    }).then(() => this.handleSubmitToggle(`${this.props.commentId}`))
  }
  

  render() {
    const user = currentUser();

    if (!user) {
      return <div></div>
    } else if (this.props.user === currentUser().username && this.props.comment.replies.length > 0) {
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
              <form className="delete-button" onSubmit={e => this.handleSubmit(e, updateComment)}>
                <button type="submit">Delete</button>
              </form>
            </div>
          )}
        </Mutation>
      )
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
              <form className="delete-button" onSubmit={e => this.handleSubmit2(e, deleteComment)}>
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
