import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";
import Picker from 'react-giphy-component';

const { REPLY_COMMENT } = Mutations;
const { FETCH_VIDEO } = Queries;

class ReplyCommentCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "@" + this.props.user,
      gif: "",
      error: ""
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
    let gif = this.state.gif

    if (this.state.text === "@" + this.props.user) {
      this.setState({ error: "cannot be empty"})
      return
    }

    addReplyComment({
      variables: {
        text: text,
        author: currentUser().id,
        parentCommentId: this.props.parentId,
        gif: gif
      }
    })
      .then(data => {
        this.setState({
          text: "@" + this.props.user,
          gif: "",
          error: ""
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

  updategif(gif) {
    this.setState({ gif: gif.downsized.url }, () => console.log(this.state))
  }

  render() {
    const user = currentUser();
    if (!user) {
      return <textarea
        value={this.state.text}
        onChange={this.update("text")}
        placeholder="Must Be Signed In to Comment"
      />
    } 
    else {
    if (currentUser().username !== this.props.user) {
      let error;
      if (this.state.error === "cannot be empty") {
        error = "Comment must have text"
      }
    return (
      <Mutation
        onError={error => { this.setState({ error: error.message }) }}
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
              <div>{error}</div>
              <button type="submit">Reply</button>
            </form>
            <div className="giphy-reply"> <Picker apiKey="EeZhW081PZQ2Abce60Y4EQulHVTzcbRA" onSelected={this.updategif.bind(this)} /></div>
          </div>
        )}
      </Mutation>
    )
     } else {
       return (
         <div></div>
       )
     }
  }}
}

export default ReplyCommentCreate;