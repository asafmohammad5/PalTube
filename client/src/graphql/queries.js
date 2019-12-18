import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_VIDEO: gql`
  query queryVideo($id:ID!){
  video(_id:$id){
    _id
    title
    description
    category
    url
    likes {
      _id
    }
    dislikes {
      _id
    }
    keywords
    comments {
      _id
      text
      date
      author {
        username
      }
      replies {
        _id
        text
        date
        author {
          username
        }
      }
    }
     }
    }
  `,
 FETCH_COMMENT: gql`
  query FetchComment($id: ID!){
  comment (_id: $id) {
    _id
    text
    date
    author {
      username
    }
    date
    replies {
      _id
      text
      date
      author {
        username
      }
    }
  }
}
`,
  FETCH_VIDEOS: gql`
  query filterVideos($criteria: String){
  videos(criteria: $criteria){
      _id
      title
      description
      category
      url
      keywords
      comments{
        _id
      }
    }
  }

 `,
  FETCH_VIDEO_LIKES: gql`
    query FetchVideoLikes($id: ID!) {
      video(_id: $id){ 
        likes {
          _id
          username
        }
      }
    }
  `

};
