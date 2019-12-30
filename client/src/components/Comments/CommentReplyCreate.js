import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";
import Picker from 'react-giphy-component';

const { REPLY_COMMENT} = Mutations;
const { FETCH_VIDEO } = Queries;

class CommentReplyCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      gif: "",
      error: ""
    }
  }

  handleToggle(e, id) {
    if (e) {
    e.preventDefault();
    }
    var giphy = document.getElementById(id);
 
    if (giphy) {
      giphy.classList.toggle("show");
    }
  }

  handleToggleSubmit(id) {
    var giphy = document.getElementById(id);

    if (giphy && giphy.classList.contains("show")) {
      giphy.classList.toggle("show");
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

    if (this.state.text === "") {
      this.setState({ error: "GraphQL error: Cannot return null for non-nullable field CommentType.text." })
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
          text: "",
          gif: "",
          error: ""
        })
      }).then(data => {
        this.handleToggleSubmit(this.props.parentId.concat("options"));
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
    this.setState({ gif: gif.downsized.url })
  }

  render() {
    const user = currentUser();
    const commentId = this.props.parentId.concat("options"); 
    if (!user) {
      return <div></div>
    }
      else {
      let error;
      if (this.state.error === "GraphQL error: Cannot return null for non-nullable field CommentType.text.") {
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
            <form className="reply-comment" onSubmit={e => this.handleSubmit(e, addReplyComment)}>
              <input
                value={this.state.text}
                onChange={this.update("text")}
                placeholder={`${currentUser().username} leave your reply, be nice :)`}
                className="comment-create-input"
              />
              <div>{error}</div>
              <div className="reply-buttons">
              <div className="gif-popup-reply">
                <button className="create-comment-button" onClick={(e) => this.handleToggle(e, commentId)}>Gif</button>
                <div className="giftext-reply" id={commentId}>
                  <Picker id="giphy-picker" apiKey="EeZhW081PZQ2Abce60Y4EQulHVTzcbRA" onSelected={this.updategif.bind(this)} />
                </div>
              </div>
              <button className="reply-comment-button" type="submit">Reply</button>
              </div>
            </form>
            
          </div>
        )}
      </Mutation>
      )};
  }
}

export default CommentReplyCreate;