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
    keywords
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
`
};
