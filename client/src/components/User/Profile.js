import React from "react";
import Queries from '../../graphql/queries';
import SideBar from '../ui/SideBar';
import MiniSideBar from '../ui/MiniSideBar';
import NavBar from '../NavBar';
import { Query } from "react-apollo";
import {withRouter} from "react-router-dom";

const {FETCH_USER} = Queries;

class UserProfile extends React.Component {
  render () {
    return <Query query={FETCH_USER} variables={{ id: this.props.match.params.userId}}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        const username = data.user.username;
        const image = data.user.image;
        const email = data.user.email;

        return (
          <div>
            <NavBar />
            <div className="container">
              <div className="flex-grid">
                <MiniSideBar />
                <SideBar />
                <div className="user-profile">
                  <img src={image} className="user-profile-image" />
                  <div className="user-profile-name">{username}</div>
                  <div className="user-profile-email">{email}</div>
                </div>
              </div>
             
            </div>
          </div>
        )
      }}
    </Query> 
  }
}

export default withRouter(UserProfile);