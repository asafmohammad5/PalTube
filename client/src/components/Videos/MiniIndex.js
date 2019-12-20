import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
const { FETCH_VIDEOS } = Queries;

class MiniIndex extends Component {
  renderVideos() { 
    let miniIndex = this.props.data.videos.slice((this.props.data.videos.length) - 5); 
    
    return miniIndex.map((
      { _id, title, url }) => {
      return (
        <div key={_id} className="mini-video-container">
          <div className="mini-vid-player">
            <object className="mini-video-player">
              <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0`}></param>
              <param name="allowFullScreen" value="true"></param>
              <param name="allowscriptaccess" value="always"></param>
              <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0`}
                type="application/x-shockwave-flash"
                className="video-player" allowscriptaccess="always" allowFullScreen={true}></embed>
            </object>
          </div>
          <div className="mini-video-info">
            <Link to={`/videos/${_id}`}>
              <p className="mini-video-title clickable">
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
    return (
      <div>
        <div className="mini-container">
          <div className="flex-grid">
            <section className="main">
              <p className="mini-index-title">Videos For You</p>
              <div className="col">
                {this.renderVideos()}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}


export default graphql(FETCH_VIDEOS, {
  options: (props) => { return { variables: { criteria: undefined, perPage: 0, pageNumber: 0 } } }
})(MiniIndex);

// export default graphql(FETCH_VIDEOS)(MiniIndex);