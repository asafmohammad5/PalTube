import React from "react";
import { Link } from "react-router-dom";
import { currentUser } from '../util/util'
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";

const { IS_LOGGED_IN } = Queries;

const handleToggle = (e) => {
  e.preventDefault();
  let navLogoutPopup = document.getElementById("navLogoutPopup");

  if (navLogoutPopup) {
    navLogoutPopup.classList.toggle("display");
  }
}

const Nav = props => {
  let profilePath = "/";
  const user = currentUser();
  if (user) {
    profilePath = "profile/".concat(user.id);
  }
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              let profileSrc = currentUser() ? currentUser().image : "/stylesheets/images/default_avatar_2.png";
              let profileEmail = currentUser() ? currentUser().email : "";
              let profileUsername = currentUser() ? currentUser().username : "";
             
              return (
                <div className="navbar-logout" onClick={(e) => handleToggle(e)}><img alt="PalTube" src={profileSrc} className="navbar-pic" />
                  <div className="navPopup" id="navLogoutPopup">
                    <div className="logout-info">
                      <p className="nav-popup-username">{profileUsername}</p>
                      <p className="nav-popup-email">{profileEmail}</p>
                    </div>
                    <div className="logout-likes">
                      <Link to={profilePath}><i className="fas fa-user sign-out-icon"></i>My Profile</Link> 
                    </div>
                    <div className="logout-likes">
                      <Link to="/videos/likes"><i className="fas fa-thumbs-up sign-out-icon"></i>My Likes</Link>
                    </div>
                    <button
                      className="logout-button"
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        localStorage.removeItem("user");
                        client.writeData({ data: { isLoggedIn: false } });

                      }}
                    >
                      <Link to="/" className="nav-log-out"><i className="fas fa-sign-out-alt sign-out-icon"></i>Sign Out</Link>
                    </button> 
                      
                    </div>
                </div>
              )
            } else {
              return (
                <div className="nav-links">
                  <Link to="/register" className="nav-sign-up">SIGN UP</Link>
                  <Link to="/login" className="nav-sign-in">SIGN IN</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );

};

export default Nav; 
