import React, { Component } from 'react';
import { FETCH_VIDEO } from '../../graphql/queries'
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class VideoDetail extends Component {
  renderVideoDetail() {
    const { _id, title, url, description } = this.props.data.video;
    return (
      <div key={_id}>
        <h3>{title}</h3>
        <div>
          <object className="video-detail-player">
            <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0`}></param>
            <param name="allowFullScreen" value="true"></param>
            <param name="allowscriptaccess" value="always"></param>
            <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0`}
              type="application/x-shockwave-flash"
              className="video-player" allowscriptaccess="always" allowFullScreen="true"></embed>
          </object>
        </div>
        <div className="video-info">
          <p>{description}</p>
          
        </div>
      </div>
    );
  }

  render() {
    if (this.props.data.loading || !this.props.data.video) {
      return null;
    }
    return (
      <div className="container">
        <div className="flex-grid">
          <aside className="sidebar">
            sidebar here
          </aside>
          <section className="main">
            {this.renderVideoDetail()}
          </section>
        </div>
      </div>
    );
  }
}


export default graphql(FETCH_VIDEO, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(VideoDetail);