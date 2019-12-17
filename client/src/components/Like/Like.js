import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import {withRouter} from "react-router-dom";
const { FETCH_VIDEO } = Queries;
const { ADD_VIDEO_LIKE } = Mutations;



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
    debugger; 
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

  updateCache(cache, data) {
    
    const addVideoLike = data.data.addVideoLike;
    let video;
    try {
      video = cache.readQuery({ query: FETCH_VIDEO, variables: { id: this.props.videoId } });
    } catch (err) {
      return;
    }

    if (video) {

      let likeArray = video.video.likes;
      video = Object.assign({}, video.video, { likes: likeArray.concat(addVideoLike) })
     
      cache.writeQuery({
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId },
        data: { video: video }
      });
    }
    this.hasLiked();
  }

  hasLiked() {
 
    const likes = this.props.likes;
    // const likeCount = likes.length === 0 ? 0 : likes.length; 
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
 
    return liked ? (<div>Liked</div>) :
     ( <Mutation
        mutation={ADD_VIDEO_LIKE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(VideoLike, { data }) => {
          return (
            <div>
              <form onSubmit={(e) => this.handleLike(e, VideoLike)}>
                <button type="submit"><i class="fas fa-thumbs-up"></i></button>
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

