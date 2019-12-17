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

  updateCache(cache, { data: { addVideoComment } }) {
    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: {id: this.props.videoId} });
    } catch (err) {
      return;
    }
    
    if (video) {
     
      let commentArray = video.video.comments;
      video = Object.assign({}, video.video, {comments: commentArray.concat(addVideoComment)})

      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: {id: this.props.videoId},
        data: { video: video }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={VIDEO_COMMENT}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(addVideoComment, { data }) => (
          <div className="create-form">
            <form onSubmit={e => this.handleSubmit(e, addVideoComment)}>
              <input 
                className="comment-create-input"
                value={this.state.text}
                onChange={this.update("text")}
                placeholder={`Commenting publicly as ${currentUser().username}`}
              />
              <button className="create-comment-button" type="submit">COMMENT</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CommentCreate);