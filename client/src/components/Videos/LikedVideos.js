import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries'
import { Query } from 'react-apollo';
import SideBar from '../ui/SideBar';
import MiniSideBar from '../ui/MiniSideBar';
import { currentUser } from "../../util/util";
import NavBar from '../NavBar'
const { FETCH_USER_LIKED_VIDEOS } = Queries;

class LikedVideos extends Component {
  constructor(props) {
    super(props)
    this.state = { videosLength: 0 }
  }

  renderVideos = () => {
    let userId = currentUser().id;
    
    return (
      <Query query={FETCH_USER_LIKED_VIDEOS} variables={{ id: userId }}
        onCompleted={(data) => this.setState({ videosLength: data.user.videos_liked.length })}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            data.user.videos_liked.map(({ _id, title, url, description, comments, favoriteBy }) => {
              return (
                <div className="search-results-container" key={_id}>
                  <div className="video-detail-container ">
                    <object className="video-player">
                      <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0`}></param>
                      <param name="allowFullScreen" value="true"></param>
                      <param name="allowscriptaccess" value="always"></param>
                      <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0`}
                        type="application/x-shockwave-flash"
                        className="video-player" allowscriptaccess="always" allowFullScreen={true}></embed>
                    </object
                    >
                  </div>
                  <div className="video-detail-info-container">
                    <Link to={`/videos/${_id}`}>
                      <p className="clickable">
                        {title}
                      </p>
                    </Link>
                    <p>{description}</p>
                    <p>{comments.length} <i class="far fa-comments"></i></p>
                    <p>{favoriteBy.length} <i class="fas fa-heart"></i></p>
                  </div>
                </div>
              )
            })
          )
        }}
      </Query>
    );
  }
  render() {
    if (!currentUser()){
      this.props.history.push('/login')
    }
    return (
      <div className="container">
        <NavBar/>
        <div className="flex-grid">
          <MiniSideBar />
          <SideBar />
          <section className="main">
            <div>
              <h5>you have liked {this.state.videosLength} videos...</h5>
              {this.renderVideos()}
            </div>
          </section>
        </div>
      </div>
    );
  }
}


export default LikedVideos;