import React, { Component } from 'react';
import { currentUser } from "../../util/util";
import Mutations from "../../graphql/mutations";
import Query from "../../graphql/queries";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
const { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } = Mutations;
const { FETCH_VIDEO, FETCH_USER_FAVORITE_VIDEOS } = Query;
class Favorite extends Component {

  handleAddRemoveFavorite(e, func) {
    e.preventDefault();
    func({
      variables: {
        videoId: this.props.video._id,
        userId: currentUser().id
      }
    });
  };

  handleToggle(e) {
    e.preventDefault();
    var popup = document.getElementById("myPopup2");
    if (popup) {
      popup.classList.toggle("show");
    }
  }

  renderFavorite() {
    if (!currentUser() || !currentUser().id) {
      return (
        <div className="popup2" onClick={(e) => this.handleToggle(e)}><i className="fas far fa-heart"></i>
          <div className="popuptext2" id="myPopup2"><Link className="like-sign-in" to="/login">Sign in!</Link></div>
        </div>
      )
    }
    return (
      (<Mutation mutation={ADD_TO_FAVORITES} refetchQueries={() => {
        return [{ query: FETCH_VIDEO, variables: { id: this.props.video._id } }, { query: FETCH_USER_FAVORITE_VIDEOS, variables: { id: currentUser().id } }];
      }}>
        {(AddToFavorites, { loading, error, data  }) => {
          if (loading) return <i class="fas fa-spinner"></i>
          if(error)return <p>Error :( Please try again</p>
          return (
            <i className="far fa-heart" style={{cursor: 'pointer'}}
            onClick={(e) => this.handleAddRemoveFavorite(e, AddToFavorites)}></i>)
        }}
      </Mutation>
      )
    )
  }

  renderUnFavorite() {
    return (
      (<Mutation mutation={REMOVE_FROM_FAVORITES} refetchQueries={() => {
          return [{ query: FETCH_VIDEO, variables: { id: this.props.video._id } }];
        }}>
        {(RemoveFromFavorites, { loading, error, data  }) => {
          if (loading) return <i class="fas fa-spinner"></i>
          if (error) return <p>Error :( Please try again</p>
          return (  
            <i className="fas fa-heart fav-heart" style={{cursor:'pointer'}}
              onClick={(e) => this.handleAddRemoveFavorite(e, RemoveFromFavorites)}></i>
          )
        }}
      </Mutation>
      )
    )
  }

  render() {
    let inUserFavorites = [];
    if (currentUser() && currentUser().id) {
      let userId = currentUser().id;
      inUserFavorites = this.props.video.favoriteBy.filter(user => user._id.toString() === userId);
    }
    return (
      <>
        {inUserFavorites.length === 0 ?
          (this.renderFavorite()
          ) : (
            this.renderUnFavorite()
          )}
      </>
    );
  }
}

export default Favorite;