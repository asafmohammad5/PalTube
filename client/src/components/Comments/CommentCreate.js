import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from '../../graphql/queries';
import {currentUser} from "../../util/util";
import {withRouter} from "react-router-dom";
import Picker from 'react-giphy-component';


const { FETCH_VIDEO } = Queries;
const {VIDEO_COMMENT} = Mutations;

class CommentCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      gif: ""
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
    let gif = this.state.gif;

    addVideoComment({
      variables: {
        text: text,
        author: currentUser().id,
        videoId: this.props.videoId,
        gif: gif
      }
    })
      .then(data => {
        this.setState({
          text: "",
          gif: ""
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

  updategif (gif) {
    this.setState({ gif: gif.downsized.url}, () => console.log(this.state))
  }

  render() {
    const user = currentUser();
   
    if (!user) {
      return <div className="create-form"> 
      <input
        className="comment-create-input"
        value={this.state.text}
        placeholder="Must Be Signed In to Comment"
      />
      </div>
    } else {
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
            <div className="giphy"> <Picker apiKey="EeZhW081PZQ2Abce60Y4EQulHVTzcbRA" onSelected={this.updategif.bind(this)}/></div>
          </div>
        )}
      </Mutation>
    )};
  }
}

export default withRouter(CommentCreate);