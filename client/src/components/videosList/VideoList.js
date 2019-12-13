import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoList extends Component {
  constructor(props){
    super(props);
    this.state = { videosList: null, loading: false}
  }

  componentDidMount(){
    fetch('/api/videos')
      .then(res => res.json())
      .then((searchResult) => {
        this.setState({ videos: searchResult });
        console.log(searchResult)
      });
  }

  renderVideos() {
    return this.state.videos.videoResults.map(((video, idx) => (
      <div key={idx} style={{ width: '30%' }}>
        <ReactPlayer url={video.link} width='100%' />
        <p>{video.title}</p>
      </div>
    )));
  }

  render() {
    if (!this.state.videos) {
      return null;
    }
    return (
      <div>
        {this.renderVideos()}
      </div>
    );
  }
}

export default VideoList;