import gql from "graphql-tag";

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
export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
};
