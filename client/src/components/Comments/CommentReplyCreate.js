import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";

const { REPLY_COMMENT} = Mutations;
const { FETCH_VIDEO } = Queries;

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

  updateCache(cache, { data: { addReplyComment } }) {
    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: { id: this.props.videoId } });
    } catch (err) {
      return;
    }

    if (video) {
      video = Object.assign({}, video.video)
      let commentsArray = video.comments;
      for (let i = 0; i < commentsArray.length; i++) {
        if (this.props.parentId === commentsArray[i]._id) {
          commentsArray[i].replies.push(addReplyComment) 
        }
      
      }
      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    }
  }

  render() {
    const user = currentUser();

    if (!user) {
      return <textarea
        value={this.state.text}
        onChange={this.update("text")}
        placeholder="Must Be Signed In to Comment"
      />}
      else {
    return (
      <Mutation
        mutation={REPLY_COMMENT}
        update={(cache, data) => this.updateCache(cache, data)}
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
      )};
  }
}

export default CommentReplyCreate;