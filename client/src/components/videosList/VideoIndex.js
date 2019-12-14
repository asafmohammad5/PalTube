import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { FETCH_VIDEOS } from '../../graphql/queries'
import { graphql } from 'react-apollo';
import NavBar from "../NavBar";

class VideoIndex extends Component {
  renderVideos() {
    // debugger
    return this.props.data.videos.map((
      { _id, title, url }) => {
      return (
        <div key={_id} className="video-container">
          <ReactPlayer url={url} className="video-player"
            config={{ playerVars: { showinfo: 0 } }}
          />
          <div className="video-info">
          <p className="video-title">{title}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.data.loading || !this.props.data.videos) {
      return null;
    }
    return (
      <div>
        <NavBar/>
       <div class="container">
        <div class="flex-grid">
          <aside class="sidebar">
            sidebar here
          </aside>
          <section class="main">
            <h3>Recommended Videos</h3>
            <div className="row">
            {this.renderVideos()}
            </div>
          </section>
        </div>
      </div>
      </div>
    );
  }
}

export default graphql(FETCH_VIDEOS)(VideoIndex);