import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { currentUser } from "../../util/util";
import {withRouter} from "react-router-dom";
const { FETCH_VIDEO_LIKES } = Queries;
const { ADD_VIDEO_LIKE } = Mutations;



class Like extends React.Component {
  constructor(props) {
 
    super(props);

    this.state = {
      currentUser: currentUser()
    }
  }

  handleLike(addVideoLike) {
    debugger; 
    return e => {
      e.preventDefault();
      addVideoLike({
        variables: {
          videoId: this.props.videoId,
          userId: this.state.currentUser.id
        }
      })
        .then(data => {
          return;
        })
    }
    
  };

  // updateCache(cache, { data: { newLike } }) {

  //   let likes;
  //   try {
  //     likes = cache.readQuery({ query: FETCH_VIDEO_LIKES, variables: { id: this.props.data.video._id } });
  //   } catch (err) {
  //     return;
  //   }
  
  //   if (likes) {
  //     let likesArray = likes.likes;
  //     cache.writeQuery({
  //       query: FETCH_VIDEO_LIKES,
  //       data: { likes: likesArray.concat(newLike) }
  //     });
  //   }
  // }

  render() {
    return (
    <Mutation
      mutation={ADD_VIDEO_LIKE}
      refetchQueries={() => {
        return [
          {
            query: FETCH_VIDEO_LIKES,
            variables: { id: this.props.videoId }
          }
        ];
      }}
    >
      {(VideoLike, { data }) => (
        <div>
          <form onSubmit={this.handleLike(VideoLike)}>
              <button type="submit"><i class="fas fa-thumbs-up"></i></button>
          </form>
        </div>
      )}
    </Mutation>
    ); 
  }
}

export default withRouter(Like);

