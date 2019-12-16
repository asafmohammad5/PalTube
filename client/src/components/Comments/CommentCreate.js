import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import {currentUser} from "../../util/util";
import {withRouter} from "react-router-dom";


const { FETCH_VIDEO } = Queries;
const {VIDEO_COMMENT} = Mutations;

class CommentCreate extends React.Component {
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

  handleSubmit(e, addVideoComment) {
    e.preventDefault();
    let text = this.state.text;

    addVideoComment({
      variables: {
        text: text,
        author: currentUser().id,
        videoId: this.props.videoId
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
        mutation={VIDEO_COMMENT}
        refetchQueries={() => {
          return [
            {
              query: FETCH_VIDEO,
              variables: { id: this.props.videoId }
            }
          ];
        }}
      >
        {(addVideoComment, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, addVideoComment)}>
              <textarea
                value={this.state.text}
                onChange={this.update("text")}
                placeholder={`Commenting publicly as ${currentUser().username}`}
              />
              <button type="submit">Create Comment</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CommentCreate);