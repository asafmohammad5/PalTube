import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
  mutation LoginUser($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      token
      loggedIn
      _id
      email
      username
    }
  }
  `,
  REGISTER_USER: gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $password2: String!) {
    register(username: $username, email: $email, password: $password, password2: $password2) {
      email
      token
      loggedIn
      _id
      username
    }
  }
 `,
  VERIFY_USER: gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`,
  VIDEO_COMMENT: gql`
    mutation VideoComment($text: String!, $author: ID!, $videoId: ID!) {
      addVideoComment(text: $text, author: $author, videoId: $videoId) {
        text
        author {
          username
        }
        replies {
          _id
        }
        date
      }
    }
  `,
  REPLY_COMMENT: gql`
    mutation ReplyComment($text: String!, $author: ID!, $parentCommentId: ID!) {
      addReplyComment(text: $text, author: $author, parentCommentId: $parentCommentId) {
        text
        author {
          username
        }
        replies {
          _id
        }
        date
      }
    }
  `
}