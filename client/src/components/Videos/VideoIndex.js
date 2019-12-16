import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from "graphql-tag";

const {FETCH_VIDEOS} = Queries;

class VideoIndex extends Component {
  renderVideos() {
    return this.props.data.videos.map((
      { _id, title, url }) => {
      return (
        <div key={_id} className="video-container">
          <div>
            <object className="video-player">
              <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0`}></param>
              <param name="allowFullScreen" value="true"></param>
              <param name="allowscriptaccess" value="always"></param>
              <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0`}
                type="application/x-shockwave-flash"
                className="video-player" allowscriptaccess="always" allowFullScreen={true}></embed>
            </object>          
          </div>
          <div className="video-info">
            <Link to={`/videos/${_id}`}>
              <p className="video-title">
              {title}
              </p>
              </Link>
          </div>
        </div>
      );
    });
  }

  render() {

    if (this.props.data.loading || !this.props.data.videos) {
      return null;
    }
    // debugger
    return (
      <div className="container">
        <div className="flex-grid">
          <aside className="sidebar">
            sidebar here
          </aside>
          <section className="main">
            <h3>Recommended Videos</h3>
            <div className="row">
              {this.renderVideos()}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default graphql(FETCH_VIDEOS)(VideoIndex);