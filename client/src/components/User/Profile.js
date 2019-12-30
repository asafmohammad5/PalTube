import React from "react";
import Queries from '../../graphql/queries';
import SideBar from '../ui/SideBar';
import MiniSideBar from '../ui/MiniSideBar';
import NavBar from '../NavBar';
import { Query } from "react-apollo";
import {withRouter, Link} from "react-router-dom";


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
        const date = new Date(+data.user.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let videos = Object.values(data.user.videos_liked)
        let displayVideo;
    
        if (videos.length > 0) {
          const {_id, url, title} = videos[videos.length - 1]
          displayVideo = 
          <div className="video-container-1">Last liked video!
            <div>
              <object className="video-player-1">
                <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0&rel=0&modest=1`}></param>
                <param name="allowFullScreen" value="true"></param>
                <param name="allowscriptaccess" value="always"></param>
                <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0&rel=0&modest=1`}
                  type="application/x-shockwave-flash"
                  className="video-player" allowscriptaccess="always" allowFullScreen={true}></embed>
              </object>
            </div>
            <div className="video-info">
              <Link to={`/videos/${_id}`}>
                <p className="video-title clickable">
                  {title}
                </p>
              </Link>
            </div>
          </div>
        } else {
          displayVideo = 
          <div>
            <p>No liked videos yet!</p>
            <div className="user-profile-novideo"><i className="fas fa-exclamation-triangle"></i></div>
          </div>
        }
 

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
                  <div className="user-profile-date">Joined: {year + "-" + month + "-" + day}</div>
                  {displayVideo}
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