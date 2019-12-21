import React, { Component } from 'react';
import Queries from '../../graphql/queries';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import SideBar from '../ui/SideBar';
import NavBar from '../NavBar';
import MiniSideBar from '../ui/MiniSideBar'
const { FETCH_VIDEOS } = Queries;

class VideoIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: { videos: [] }, pageNumber: 0, perPage: 16,
      loading: false, firstLoad: true, documentsFullyLoaded: false
    }
  }

  renderVideos() {
    if (this.state.loading) {
      return <div className="video-index-loading-div">loading...</div>
    }
    if (Object.values(this.state.data).length === 0) {
      return null
    }
    return this.state.data.videos.map((
      { _id, title, url }) => {
      return (
        <div key={_id} className="video-container">
          <div>
            <object className="video-player">
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
      );
    });
  }

  onVideosFetched = data => {
    if (data.videos.length === 0) {
      this.setState({ documentsFullyLoaded: true, loading: false });
      return
    }
    let newPageNumber = this.state.pageNumber += 1;
    const videos = this.state.data.videos.concat(data.videos);
    this.setState({ data: { videos: videos } });
    this.setState({ pageNumber: newPageNumber });
    this.setState({ loading: false, firstLoad: false });
  }


  componentDidMount() {
    document.getElementById("btnLoad").click();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    if (this.state.firstLoad || this.state.loading) {
      return;
    }
    if (this.state.documentsFullyLoaded) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      document.getElementById("btnLoad").click();
    }
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div id="scrollDiv">
            <NavBar />
            <div className="container">
              <div className="flex-grid">
                <MiniSideBar/>
                <SideBar />
                <section className="main">
                  <h3>Recommended Videos</h3>
                  <div className="row">
                    {this.state.data && this.renderVideos(this.state.data)}
                  </div>
                  <div style={{ width: '1px', height: '1px' }}>
                    <button style={{ width: '1px', height: '1px' }} id="btnLoad" style={{ width: '100%', backgroundColor: 'darkgrey' }}
                      onClick={async (e) => {
                        e.preventDefault();
                        this.setState({ loading: true });
                        const { data } = await client.query({
                          query: FETCH_VIDEOS,
                          variables: { criteria: undefined, perPage: this.state.perPage, pageNumber: this.state.pageNumber },
                          fetchPolicy: "network-only"
                        });
                        this.onVideosFetched(data);
                      }}
                    >
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

export default VideoIndex;

// export default graphql(FETCH_VIDEOS, {
//   options: (props) => { return { variables: { criteria: undefined, perPage: 0, pageNumber: 0 } } }
// })(VideoIndex);