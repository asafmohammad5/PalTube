import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import { withRouter } from "react-router-dom";
const { FETCH_VIDEO } = Queries;
const { ADD_VIDEO_LIKE } = Mutations;
const { REMOVE_VIDEO_LIKE } = Mutations;
const { ADD_VIDEO_DISLIKE } = Mutations;
const { REMOVE_VIDEO_DISLIKE } = Mutations;


class Dislike extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      currentUser: currentUser(),
      hasDisliked: false
    }
    this.hasDisliked = this.hasDisliked.bind(this);
  }

  handleDislike(e, VideoDislike) {

    e.preventDefault();

    VideoDislike({
      variables: {
        videoId: this.props.videoId,
        userId: this.state.currentUser.id
      }
    })
      .then(data => {
        this.setState({ hasDisliked: true })
      })
  };

  handleRemoveDislike(e, VideoRemoveDislike) {

    e.preventDefault();

    VideoRemoveDislike({
      variables: {
        videoId: this.props.videoId,
        userId: this.state.currentUser.id
      }
    })
      .then(data => {
        this.setState({ hasDisliked: false })
      })
  };

  updateCache(cache, data) {

    const addVideoDislike = data.data.addVideoDislike;
    const removeVideoDislike = data.data.removeVideoDislike;

    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: { id: this.props.videoId } });
    } catch (err) {
      return;
    }
    
    if (video && addVideoDislike) {

      let dislikeArray = video.video.dislikes;
      video = Object.assign({}, video.video, { dislikes: dislikeArray.concat(addVideoDislike) })

      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    } else if (video && removeVideoDislike) {
      let dislikeArray = video.video.dislikes;
      for (let i = 0; i < dislikeArray.length; i++) {
        const el = dislikeArray[i];
        if (el._id === removeVideoDislike._id) {
          dislikeArray.splice(i, 1);
        }
      }

      video = Object.assign({}, video.video, { dislikes: dislikeArray })

      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    }
    this.hasDisliked();
  }

  getDislikeCount() {
    let countDislike = this.props.dislikes.length;

    if (countDislike === 0) {
      return <p>No dislikes</p>
    } else if (countDislike === 1) {
      return <p>1 dislike</p>
    } else {
      return <p>{countDislike} dislikes</p>
    }
  }

  handleToggle(e) {
    e.preventDefault();
    var popup = document.getElementById("myPopup");

    if (popup) {
      popup.classList.toggle("show");
    }
  }

  hasDisliked() {

    const dislikes = this.props.dislikes;
    const likes = this.props.likes; 
    const user = currentUser();
    if (!user) {
      return (
        <div className="popup" onClick={(e) => this.handleToggle(e)}><i className="far fa-thumbs-down unliked-thumb"></i>{this.getDislikeCount()}
          <div class="popuptext" id="myPopup"><Link className="like-sign-in" to="/login">Sign in!</Link></div>
        </div>
      )
    }

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
    let disliked;
    for (let i = 0; i < dislikes.length; i++) {
      const el = dislikes[i];
      if (dislikes[i]._id === this.state.currentUser.id) {
        disliked = true;
        break;
      } else {
        disliked = false;
      }
    }
    
    if (liked) {
      return (
      <div className="dislike-display">
        <i className="far fa-thumbs-down unliked-thumb"></i>{this.getDislikeCount()}
      </div>
      )
    } else {
    return disliked ? (<Mutation
      mutation={REMOVE_VIDEO_DISLIKE}
      update={(cache, data) => this.updateCache(cache, data)}
    >
      {(VideoRemoveDislike, { data }) => {
        return (
          <div>
            <form className="dislike-display" onSubmit={(e) => this.handleRemoveDislike(e, VideoRemoveDislike)}>
              <button type="submit"><i className="far fa-thumbs-down liked-thumb"></i></button>
              {this.getDislikeCount()}
            </form>
          </div>
        )
      }}
    </Mutation>
    ) :
      (<Mutation
        mutation={ADD_VIDEO_DISLIKE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(VideoDislike, { data }) => {
          return (
            <div>
              <form className="dislike-display" onSubmit={(e) => this.handleDislike(e, VideoDislike)}>
                <button type="submit"><i class="far fa-thumbs-down unliked-thumb"></i></button>
                {this.getDislikeCount()}
              </form>
            </div>
          )
        }}
      </Mutation>
      )}


  }

  render() {
    return (
      <div>
        {this.hasDisliked()}
      </div>
    )
  }
}

export default graphql(FETCH_VIDEO)(Dislike); 