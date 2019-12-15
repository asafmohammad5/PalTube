import gql from "graphql-tag";

// export const FETCH_VIDEOS = gql`{
// 	videos{
//     _id
//     title
//     description
//     category
//     url
//     keywords
//   }
// }`;

// export const FETCH_VIDEO = gql`
//   query queryVideo($id:ID!){
//   video(_id:$id){
//     _id
//     title
//     description
//     category
//     url
//     keywords
//   }
// }
// `;

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
 `
};
