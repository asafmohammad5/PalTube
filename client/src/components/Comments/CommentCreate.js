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
      gif: "",
      error: ""
    }

  }

  handleToggle(e) {
    if (e) {
      e.preventDefault();
    }
    var giphy = document.getElementById("myGiphy");

    if (giphy) {
      giphy.classList.toggle("show");
    }
  }

  handleSubmitToggle() {
    var giphy = document.getElementById("myGiphy");

    if (giphy && giphy.classList.contains("show")) {
      giphy.classList.toggle("show");
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

    if (this.state.text === "") {
      this.setState({ error: "GraphQL error: Cannot return null for non-nullable field CommentType.text." })
      return
    }

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
          gif: "",
          error: ""
        })
        
      }).then(data => {
        if (gif) {
          this.handleSubmitToggle()
        }
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
    this.setState({ gif: gif.downsized.url})
  }

  render() {
    const user = currentUser();
    const profileSrc = user && user.image ? user.image : "/stylesheets/images/default_avatar_2.png";
   
    if (!user) {
      return <div className="create-form-1"> 
      <img src={profileSrc} className="comment-create-avatar" />
      <input
        className="comment-create-input"
        value={this.state.text}
        placeholder="Must Be Signed In to Comment"
      />
      </div>
    } else {
      let error;
      if (this.state.error === "GraphQL error: Cannot return null for non-nullable field CommentType.text.") {
        error = "Comment must have text"
      }
      return (
      <Mutation
        onError={error => { this.setState({error: error.message})}}
        mutation={VIDEO_COMMENT}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(addVideoComment, { data }) => (
          <div className="create-form">
            <div className="comment-create-position">
              <img src={profileSrc} className="comment-create-avatar" />
               <form className="comment-submit-form" onSubmit={e => this.handleSubmit(e, addVideoComment)}>
               <input 
                  type="text-area"
                  className="comment-create-input"
                  value={this.state.text}
                  onChange={this.update("text")}
                  placeholder={`Commenting publicly as ${currentUser().username}`}
               />
               <div>{error}</div>
               <div className="comment-create-buttons">
                 <div className="comment-create-btns">
                      <div className="gif-popup">
                        <button className="create-comment-button" onClick={(e) => this.handleToggle(e)}>Gif</button>
                        <div className="giftext" id="myGiphy">
                          
                          <Picker id="giphy-picker" apiKey="EeZhW081PZQ2Abce60Y4EQulHVTzcbRA" onSelected={this.updategif.bind(this)} /> 
                        </div>
                      </div>
                   <button className="create-comment-button" type="submit">Comment</button>
                 </div>
                  
               </div>
               </form>
            </div>
            
            </div>
        )}
      </Mutation>
    )};
  }
}

export default withRouter(CommentCreate);