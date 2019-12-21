import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries'
import { ApolloConsumer } from 'react-apollo';
import SideBar from '../ui/SideBar'
import NavBar from '../NavBar';
import MiniSideBar from '../ui/MiniSideBar'
import { withRouter } from 'react-router';
const { FETCH_VIDEOS } = Queries;

class VideoSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: { videos: [] }, pageNumber: 0, perPage: 16,
      loading: false, firstLoad: true, documentsFullyLoaded: false,
      videosLength: 0,
      criteria: undefined
    }

    this.props.history.listen((location, action) => {
      this.setState({
        data: { videos: [] }, pageNumber: 0, perPage: 16,
        loading: false, firstLoad: true, documentsFullyLoaded: false,
        videosLength: 0})
      this.setState({ criteria: window.location.hash.split('/')[2] }, ()=>{
        document.getElementById("btnLoad").click();
      })
    });
  }

  getCriteria = () => {
    return window.location.hash.split('/')[2];
  }
  renderSearchResult() {
    if (this.state.loading) {
      return <div className="video-index-loading-div">loading...</div>
    }
    if (Object.values(this.state.data).length === 0) {
      return null
    }
    return this.state.data.videos.map((
      { _id, title, url, description, comments, favoriteBy }) => {
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
            <Link to={`/videos/${_id}`}>
              <p className="clickable">
                {title}
              </p>
            </Link>
            <p>{description}</p>
            <p>{comments.length} <i className="far fa-comments"></i></p>
            <p>{favoriteBy.length} <i className="fas fa-heart"></i></p>
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
    this.setState({ criteria: window.location.hash.split('/')[2] }, () => {
      document.getElementById("btnLoad").click();
    })
    // document.getElementById("btnLoad").click();
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
                <MiniSideBar />

                <SideBar />
                <section className="main">
                  <h3>Searching for {this.state.criteria}</h3>
                  <div className="row">
                    {this.state.data && this.renderSearchResult(this.state.data)}
                  </div>
                  <div style={{ width: '1px', height: '1px' }}>
                    <button style={{ width: '1px', height: '1px' }} id="btnLoad" style={{ width: '100%', backgroundColor: 'darkgrey' }}
                      onClick={async (e) => {
                        e.preventDefault();
                        this.setState({ loading: true });
                        const { data } = await client.query({
                          query: FETCH_VIDEOS,
                          variables: { criteria: this.state.criteria, perPage: this.state.perPage, pageNumber: this.state.pageNumber },
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

export default withRouter(VideoSearch);

// export default graphql(FETCH_VIDEOS, {
//   options: (props) => { return { variables: { criteria: undefined, perPage: 0, pageNumber: 0 } } }
// })(VideoIndex);