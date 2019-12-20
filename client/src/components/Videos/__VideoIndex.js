import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { graphql, ApolloConsumer, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import SideBar from '../ui/SideBar';
import NavBar from '../NavBar';
const { FETCH_VIDEOS } = Queries;

class VideoIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { data: { videos: [] }, pageNumber: 0, perPage: 4 }
    this.pageNumber = 0;
  }

  handleClick = async ()=> {
    const { data } = await this.props.client.query({
      query: FETCH_VIDEOS,
      variables: { criteria: undefined, perPage: this.state.perPage, pageNumber: this.state.pageNumber },
      fetchPolicy: "network-only"
    })
  }


  renderVideos() {
    if (Object.values(this.state.data).length === 0) {
      return null
    }
    return this.state.data.videos.map((
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
              <p className="video-title clickable">
                {title}
              </p>
            </Link>
          </div>
        </div>
      );
    });
  }

  onVideosFetched = data => {
    let newPageNumber = this.state.pageNumber += 1;
    const videos = this.state.data.videos.concat(data.videos);
    this.setState({ data: { videos: videos } });
    this.setState({ pageNumber: newPageNumber });
  }

 

  onFetchMore = (event) => {
    const { data: { fetchMore } } = this.props;
    fetchMore({
      variables: { criteria: undefined, perPage: this.state.perPage, pageNumber: this.state.pageNumber },
      notifyOnNetworkStatusChange: true,
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {

        this.onVideosFetched(fetchMoreResult)
      },
    });
  }


  render() {
    return (
      <Query query={FETCH_VIDEOS} fetchPolicy="cache"
        notifyOnNetworkStatusChange = {true}
      variables={{ criteria: undefined, perPage: this.state.perPage, pageNumber: this.pageNumber }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        this.pageNumber += 1
        const videos = this.state.data.videos.map(video => {
          return <div>
            <div>{video.title} </div>
            <br/>
          </div>
        })
        return <div>
          {videos}
          <span style={{ width: '200px' }} onClick={(e) => { e.preventDefault(); this.onFetchMore() }}>load more</span>
        </div>
      }}
    </Query>
    )
  }

  Oldrender() {
    return (
      <ApolloConsumer>
        {client => (
          <div id="scrollDiv">
            <NavBar />
            <div className="container">
              <div className="flex-grid">
                <SideBar />
                <section className="main">
                  <h3>Recommended Videos</h3>
                  <div className="row">
                    {this.state.data && this.renderVideos(this.state.data)}
                  </div>
                  <div style={{ width: '100%' }}>
                    <button style={{ width: '100%', backgroundColor: 'darkgrey' }}
                      onClick={async () => {
                        const { data } = await client.query({
                          query: FETCH_VIDEOS,
                          variables: { criteria: undefined, perPage: this.state.perPage, pageNumber: this.state.pageNumber },
                          fetchPolicy: "network-only"
                        });
                        this.onVideosFetched(data);
                      }}
                    >
                      Click me!
                  </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}


export default graphql(FETCH_VIDEOS, {
  options: (props) => { return { variables: { criteria: undefined, perPage: 5, pageNumber: 0 } } }
})(VideoIndex);
