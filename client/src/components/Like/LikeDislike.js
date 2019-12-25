import React from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { currentUser } from "../../util/util";
const { FETCH_VIDEO } = Queries;
const { ADD_VIDEO_LIKE } = Mutations;
const { REMOVE_VIDEO_LIKE } = Mutations;
const { ADD_VIDEO_DISLIKE } = Mutations;
const { REMOVE_VIDEO_DISLIKE } = Mutations;

class LikeDislike extends React.Component {
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

    const addVideoLike = data.data.addVideoLike;
    const removeVideoLike = data.data.removeVideoLike;
    const addVideoDislike = data.data.addVideoDislike;
    const removeVideoDislike = data.data.removeVideoDislike;
    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: { id: this.props.videoId } });
    } catch (err) {
      return;
    }

    if (video && addVideoLike) {

      let likeArray = video.video.likes;
      let dislikeArray = video.video.dislikes;
      for (let i = 0; i < dislikeArray.length; i++) {
        const el = dislikeArray[i];
        if (el._id === addVideoLike._id) {
          dislikeArray.splice(i, 1);
        }
      }
      video = Object.assign({}, video.video, { likes: likeArray.concat(addVideoLike), dislikes: dislikeArray })
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
    } else if (video && addVideoDislike) {

      let dislikeArray = video.video.dislikes;
      let likeArray = video.video.likes;
      for (let i = 0; i < likeArray.length; i++) {
        const el = likeArray[i];
        if (el._id === addVideoDislike._id) {
          likeArray.splice(i, 1);
        }
      }
      video = Object.assign({}, video.video, { likes: likeArray, dislikes: dislikeArray.concat(addVideoDislike) })
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

  hasLiked() {
    const dislikes = this.props.dislikes;
    const likes = this.props.likes;
    const user = currentUser();
    if (!user) {
      return (
        <div className="like-bar">
        <div className="popup like-display" onClick={(e) => this.handleToggle(e)}><i className="far fa-thumbs-up unliked-thumb"></i>{this.getLikeCount()}
            <div className="dislike-display"><i className="far fa-thumbs-down unliked-thumb"></i>{this.getDislikeCount()}</div> 
          <div class="popuptext" id="myPopup"><Link className="like-sign-in" to="/login">Sign in!</Link></div>
        </div>
        </div>
      )
    }


    let liked;
    for (let i = 0; i < likes.length; i++) {
      if (likes[i]._id === this.state.currentUser.id) {
        liked = true;
        break;
      } else {
        liked = false;
      }

    }
    let disliked;
    for (let i = 0; i < dislikes.length; i++) {
      if (dislikes[i]._id === this.state.currentUser.id) {
        disliked = true;
        break;
      } else {
        disliked = false;
      }
    }

    if (!liked && !disliked) {
      return (
      <div className="like-bar">
        <Mutation
          mutation={ADD_VIDEO_LIKE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(VideoLike, { data }) => {
            return (
              <div>
                <form className="like-display" onSubmit={(e) => this.handleLike(e, VideoLike)}>
                  <button type="submit"><i class="far fa-thumbs-up unliked-thumb"></i></button>
                  {this.getLikeCount()}
                </form>
              </div>
            )
          }}
        </Mutation>
        <Mutation
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
        </div>)
    } else if (liked && !disliked) {
      return (<div className="like-bar">
        <Mutation
          mutation={REMOVE_VIDEO_LIKE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(VideoRemoveLike, { data }) => {
            return (
              <div>
                <form className="like-display" onSubmit={(e) => this.handleRemoveLike(e, VideoRemoveLike)}>
                  <button type="submit"><i className="far fa-thumbs-up liked-thumb"></i></button>
                  {this.getLikeCount()}
                </form>
              </div>
            )
          }}
        </Mutation>
        <Mutation
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
      </div>)
    } else if (!liked && disliked) {
      return (<div className="like-bar">
        <Mutation
          mutation={ADD_VIDEO_LIKE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(VideoLike, { data }) => {
            return (
              <div>
                <form className="like-display" onSubmit={(e) => this.handleLike(e, VideoLike)}>
                  <button type="submit"><i class="far fa-thumbs-up unliked-thumb"></i></button>
                  {this.getLikeCount()}
                </form>
              </div>
            )
          }}
        </Mutation>
        <Mutation
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
      </div>)
    }

  }

  render() {
    return (
      <div>
        {this.hasLiked()}
      </div>
    )
  }
}

export default graphql(FETCH_VIDEO)(LikeDislike); 