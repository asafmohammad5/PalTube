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
    keywords
    comments {
      _id
    }
     }
    }
  `,
  FETCH_VIDEOS: gql`{
	videos{
    _id
    title
    description
    category
    url
    keywords
    }
  }
 `,
 FETCH_COMMENT: gql`
  query FetchComment($id: ID!){
  comment (_id: $id) {
    text
    author {
      _id
      username
    }
    date
    replies {
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
