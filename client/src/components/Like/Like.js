import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import {withRouter} from "react-router-dom";
const { FETCH_VIDEO } = Queries;
const { ADD_VIDEO_LIKE } = Mutations;
const { REMOVE_VIDEO_LIKE } = Mutations;

class Like extends React.Component {
  constructor(props) {
 
    super(props);

    this.state = {
      currentUser: currentUser(),
      hasLiked: false
    }
    this.hasLiked = this.hasLiked.bind(this);
  }

  handleLike(e, VideoLike) {
    
    e.preventDefault();
    
      VideoLike({
        variables: {
          videoId: this.props.videoId,
          userId: this.state.currentUser.id
        }
      })
        .then(data => {
          this.setState({ hasLiked: true })
        })
  };

  handleRemoveLike(e, VideoRemoveLike) {

    e.preventDefault();

    VideoRemoveLike({
      variables: {
        videoId: this.props.videoId,
        userId: this.state.currentUser.id
      }
    })
      .then(data => {
        this.setState({ hasLiked: false })
      })
  };

  updateCache(cache, data) {
    
    const addVideoLike = data.data.addVideoLike;
    const removeVideoLike = data.data.removeVideoLike;
    
    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: { id: this.props.videoId } });
    } catch (err) {
      return;
    }
  
    if (video && addVideoLike) {

      let likeArray = video.video.likes;
      video = Object.assign({}, video.video, { likes: likeArray.concat(addVideoLike) })
     
      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    } else if (video && removeVideoLike) {
      let likeArray = video.video.likes;
      for (let i = 0; i < likeArray.length; i++) {
        const el = likeArray[i];
        if (el._id === removeVideoLike._id) {
          likeArray.splice(i, 1);
        }
      }
   
      video = Object.assign({}, video.video, { likes: likeArray })

      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    }
    this.hasLiked();
  }

  getLikeCount() {
    let countLike = this.props.likes.length; 
    
    if (countLike === 0) {
      return <p>No likes</p>
    } else if (countLike === 1) {
      return <p>1 like</p>
    } else {
      return <p>{countLike} likes</p>
    }
  }

  handleToggle(e) {
    e.preventDefault();
    var popup = document.getElementById("myPopup");
    
    if (popup) {
      popup.classList.toggle("show");
    }
  }

  hasLiked() {
 
    const likes = this.props.likes;
    const user = currentUser(); 
    if (!user) {
      return (
      <div className="popup" onClick={(e) => this.handleToggle(e)}><i className="fas fa-thumbs-up unliked-thumb"></i>
        <div className="popuptext" id="myPopup"><Link className="like-sign-in"to="/login">Sign in!</Link></div>
      </div>
      )}

   
    let liked; 
    for (let i = 0; i < likes.length; i++) {
      const el = likes[i];
      if (likes[i]._id === this.state.currentUser.id) {
        liked = true; 
        break; 
      } else {
        liked = false; 
      }
    
    }
 
    return liked ? (<Mutation
      mutation={REMOVE_VIDEO_LIKE}
      update={(cache, data) => this.updateCache(cache, data)}
    >
      {(VideoRemoveLike, { data }) => {
        return (
          <div>
            <form onSubmit={(e) => this.handleRemoveLike(e, VideoRemoveLike)}>
              <button type="submit"><i className="fas fa-thumbs-up liked-thumb"></i></button>
              {this.getLikeCount()}
            </form>
          </div>
        )
      }}
    </Mutation>
    ) :
     ( <Mutation
        mutation={ADD_VIDEO_LIKE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(VideoLike, { data }) => {
          return (
            <div>
              <form onSubmit={(e) => this.handleLike(e, VideoLike)}>
                <button type="submit"><i className="far fa-thumbs-up unliked-thumb"></i></button>
                {this.getLikeCount()}
              </form>
            </div>
          )
        }}
      </Mutation>
    )
        
  
  }

  render() {
    return (
      <div>
        {this.hasLiked()}
      </div>
    )  
  }
}

export default graphql(FETCH_VIDEO)(Like); 

