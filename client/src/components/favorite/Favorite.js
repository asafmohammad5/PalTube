import React, { Component } from 'react';
import { currentUser } from "../../util/util";
import Mutations from "../../graphql/mutations";
import Query from "../../graphql/queries";
import { Mutation } from "react-apollo";

const { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } = Mutations;
const { FETCH_VIDEO } = Query;

class Favorite extends Component {

  handleAddToFavorite(e, AddToFavorites) {
    e.preventDefault();
    AddToFavorites({
      variables: {
        videoId: this.props.video._id,
        userId: currentUser().id
      }
    });
  };

  renderFavorite() {
    return (
      (<Mutation mutation={ADD_TO_FAVORITES}
        refetchQueries={() => {
          return [{ query: FETCH_VIDEO, variables: { id: this.props.video._id } }];
        }}>
        {(AddToFavorites, { data }) => {
          return (
            <div>
              <form onSubmit={(e) => this.handleAddToFavorite(e, AddToFavorites)}>
                <button type="submit"><i className="far fa-heart"></i></button>
              </form>
            </div>
          )
        }}
      </Mutation>
      )
    )
  }

  handleRemoveFromFavorite(e, AddToFavorites) {
    e.preventDefault();
    AddToFavorites({
      variables: {
        videoId: this.props.video._id,
        userId: currentUser().id
      }
    });
  };

  renderUnFavorite() {
    return (
      (<Mutation mutation={REMOVE_FROM_FAVORITES}
        refetchQueries={() => {
          return [{ query: FETCH_VIDEO, variables: { id: this.props.video._id } }];
        }}>
        {(RemoveFromFavorites, { data }) => {
          return (
            <div>
              <form onSubmit={(e) => this.handleRemoveFromFavorite(e, RemoveFromFavorites)}>
                <button type="submit"><i className="fas fa-heart"></i></button>
              </form>
            </div>
          )
        }}
      </Mutation>
      )
    )
  }

  render() {
    if (!currentUser) {
      return
    }
    let userId = currentUser().id;
    let inUserFavorites = this.props.video.favoriteBy.filter(user => user._id.toString() === userId);
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