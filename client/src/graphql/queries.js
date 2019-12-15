import gql from "graphql-tag";

export const FETCH_VIDEOS = gql`
  query filterVideos($criteria: String){
  videos(criteria: $criteria){
      _id
      title
      description
      category
      url
      keywords
    }
  }
`;

export const FETCH_VIDEO = gql`
  query queryVideo($id:ID!){
  video(_id:$id){
    _id
    title
    description
    category
    url
    keywords
  }
}
`;

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
};
