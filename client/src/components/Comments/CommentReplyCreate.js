import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";

const { REPLY_COMMENT} = Mutations;

class CommentReplyCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ""
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e, addReplyComment) {
    e.preventDefault();
    let text = this.state.text;

    addReplyComment({
      variables: {
        text: text,
        author: currentUser().id,
        parentCommentId: this.props.parentId
      }
    })
      .then(data => {
        this.setState({
          text: ""
        })
      })
  };

  render() {
    return (
      <Mutation
        mutation={REPLY_COMMENT}
      >
        {(addReplyComment, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, addReplyComment)}>
              <textarea
                value={this.state.text}
                onChange={this.update("text")}
                placeholder={`Commenting publicly as ${currentUser().username}`}
              />
              <button type="submit">Reply</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CommentReplyCreate;