import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";
import Picker from 'react-giphy-component';

const { REPLY_REPLY_COMMENT } = Mutations;
const { FETCH_VIDEO } = Queries;

class ReplyCommentCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      gif: "",
      error: ""
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e, replyReplyComment) {
    e.preventDefault();
    if (this.state.text === "") {
      this.setState({ error: "cannot be empty" })
      return
    }

    let text = this.state.text;
    let gif = this.state.gif
    let text1; 
    text1 = this.props.user + " " + text

    replyReplyComment({
      variables: {
        text: text1,
        author: currentUser().id,
        parentCommentId: this.props.parentId,
        gif: gif,
        replyTo: this.props.replyTo
      }
    })
      .then(data => {
        this.setState({
          text: "",
          gif: "",
          error: ""
        })
      })
  };

  updateCache(cache, { data: { replyReplyComment } }) {
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
          commentsArray[i].replies.push(replyReplyComment)
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
    this.setState({ gif: gif.downsized.url })
  }

  render() {
    const user = currentUser();
    if (!user) {
      return <input
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
        mutation={REPLY_REPLY_COMMENT}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(replyReplyComment, { data }) => (
          <div>
            <form className="reply-reply-create" onSubmit={e => this.handleSubmit(e, replyReplyComment)}>
              <input
                value={this.state.text}
                onChange={this.update("text")}
                placeholder={"@" + this.props.user}
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