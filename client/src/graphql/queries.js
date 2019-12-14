import gql from "graphql-tag";

<<<<<<< HEAD
export const FETCH_VIDEOS = gql`{
	videos{
    _id
    title
    description
    category
    url
    keywords
  }
}`;
=======
export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
};
>>>>>>> 9e2560e28d258961387d3de3cdad8e8453ba795f
