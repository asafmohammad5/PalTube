import React from 'react';
import Like from "./Like";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
import { currentUser } from "../../util/util";
const { FETCH_VIDEO } = Queries;

class LikeVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: currentUser(),
      hasLiked: false
    }

  }

  
  render() {

    return <Query query={FETCH_VIDEO} variables={{ id: this.props.videoId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        const likes = data.video.likes; 
        return (<div><Like likes={likes} videoId={this.props.videoId} /> </div>)     

      }}
    </Query>
  }
}

export default LikeVideo;