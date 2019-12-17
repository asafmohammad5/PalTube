import React, { Component } from 'react';
import Queries from '../../graphql/queries'
import { Query } from 'react-apollo';
import SideBar from '../ui/SideBar'
const { FETCH_VIDEOS } = Queries;


class VideoSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { videosLength: 0 }
  }

  renderSearchResult = () => {
    const criteria = this.props.match.params.criteria;
    return (

      <Query query={FETCH_VIDEOS} variables={{ criteria: criteria }}
        onCompleted={(data) => this.setState({ videosLength: data.videos.length })}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;


          return (

            data.videos.map(({ _id, title, url, description, comments }) => {
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
                    </object>
                  </div>
                  <div className="video-detail-info-container">
                    <p>{title}</p>
                    <p>{description}</p>
                    <p>{comments.length} comments</p>
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
    return (
      <div className="container">
        <div className="flex-grid">
          <SideBar/>
          <section className="main">
            <div>
              <h5>we found {this.state.videosLength} videos matches your search...</h5>
              {this.renderSearchResult()}
            </div>
          </section>
        </div>
      </div>
    );
  }
}


export default VideoSearch;