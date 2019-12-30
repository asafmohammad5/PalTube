import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";

const { FETCH_VIDEO } = Queries;
const { UPDATE_COMMENT } = Mutations;

class EditComment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.comment.text
    }
  }

  update(field) {
    debugger; 
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e, updateComment) {
    e.preventDefault();

    updateComment({
      variables: {
        id: this.props.comment._id,
        text: this.state.text
      }
    })
}


  render() {
    const user = currentUser();

    if (!user) {
      return <div></div>
    } else if (this.props.comment.author.username === currentUser().username) {
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
              <form className="edit-form" onSubmit={e => this.handleSubmit(e, updateComment)}>
                <input
                  className="edit-text"

                  value={this.state.text}
                  onChange={this.update("text")}
                />
                <button className="edit-button"type="submit">Edit</button>
              </form>
            </div>
          )}
        </Mutation>
      )
    } else  {
      return <div></div>
    }
  }
}

export default EditComment;
