import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_USER: gql`
  query FetchUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      image
      date
      email
      favoriteVideos {
        _id, title, url, description
      }
      videos_liked {
        _id, title, url, description
      }
    }
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
      gif
      author {
        _id
        username
        image
      }
      replies {
        _id
        text
        date
        gif
        replyTo
        author {
          _id
          username
          image
        }
      }
    }
    favoriteBy{
      _id
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
    gif
    author {
      username
      image
    }
    date
    replies {
      _id
      text
      date
      gif
      replyTo
      author {
        username
        image
      }
    }
  }
}
`,
  FETCH_VIDEOS: gql`
  query filterVideos($criteria: String, $perPage: Int!, $pageNumber: Int!){
  videos(criteria: $criteria, perPage: $perPage, pageNumber: $pageNumber){
      _id
      title
      description
      category
      url
      keywords
      comments{
        _id
      }
      favoriteBy{
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
  `,
  FETCH_USER_LIKED_VIDEOS: gql`
    query FetchUserLikedVideos($id: ID!) {
      user(_id: $id){
        _id
        videos_liked{
          _id
          title
          url
          description
        comments{
          _id
        }
        favoriteBy{
          _id
        }
        }
      }
    }
  `,
  FETCH_USER_FAVORITE_VIDEOS: gql`
    query FetchUserFavoriteVideos($id: ID!) {
      user(_id: $id){
        _id, username
      favoriteVideos{
        _id, title, url, description
        comments{
          _id
        }
        favoriteBy{
          _id
        }
      }
      }
    }
  `
};
