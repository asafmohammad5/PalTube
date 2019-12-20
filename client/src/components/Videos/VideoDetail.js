import React from 'react';
import Queries from '../../graphql/queries';
import { graphql } from 'react-apollo';
import CommentIndex from "../Comments/CommentIndex";
import LikeVideo from "../Like/LikeVideo";
import MiniIndex from './MiniIndex';
import CommentCreate from "../Comments/CommentCreate";
import SideBar from '../ui/SideBar';
import MiniSideBar from '../ui/MiniSideBar';
import Favorite from '../favorite/Favorite';
import NavBar from '../NavBar';


const{FETCH_VIDEO_LIKES} = Queries; 
const {FETCH_VIDEO} = Queries;


class VideoDetail extends React.Component {

  renderVideoDetail() {
    const { _id, title, url, description, comments, favoriteBy } = this.props.data.video;
    return (
      <div key={_id}>
        <div className="video-detail-main">
          <div className="detail-left-col">
            <object className="video-detail-player">
              <param name="movie" value={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US;showinfo=0`}></param>
              <param name="allowFullScreen" value="true"></param>
              <param name="allowscriptaccess" value="always"></param>
              <embed src={`${url}?modestbranding=1&amp;version=3&amp;hl=en_US&amp;showinfo=0`}
                type="application/x-shockwave-flash"
                className="video-player" allowscriptaccess="always" allowFullScreen={true}></embed>
            </object>
            <div className="video-title-detail">
              <h3>{title}</h3>
            </div>
            <div className="video-info-detail">
              <div className="detail-comments-favs">
              <p>{comments.length} <i class="far fa-comments"></i></p>
              <p className="video-fav-detail">{favoriteBy.length} <Favorite video={this.props.data.video} /></p>
              </div>
            <div className="rate-likes">
                <LikeVideo videoId={this.props.data.video._id} video={this.props.data.video} />
            </div>
            </div>
            <div className="video-description-detail">
              <p className="video-description-body">{description}</p>
            </div>
              <h1 className="video-comments">Comments</h1>
              <div className="commentCreate">
                <CommentCreate videoId={this.props.data.video._id} />
              </div>
              <div className="commentIndex">
                <CommentIndex videoId={this.props.data.video._id} />
              </div> 
        </div>
          <MiniIndex className="mini-index"/>
        </div>
      </div>
    );
  }

  updateCache(cache, { data: { newLike } }) {

    let likes;
    try {
      likes = cache.readQuery({ query: FETCH_VIDEO_LIKES, variables: { id: this.props.data.video._id } });
    } catch (err) {
      return;
    }
    if (likes) {
      let likesArray = likes.likes;
      cache.writeQuery({
        query: FETCH_VIDEO_LIKES,
        data: { likes: likesArray.concat(newLike) }
      });
    }
  }

  render() {
    if (this.props.data.loading || !this.props.data.video) {
      return null;
    }

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="flex-grid">
              <MiniSideBar />
              <SideBar />
           <section className="detail-main">
              <div className="row">{this.renderVideoDetail()}</div> 
           </section> 
          </div>
        </div>
      </div>
      
    );
  }
}


export default graphql(FETCH_VIDEO, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(VideoDetail);