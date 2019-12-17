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
      image
    }
  }
  `,
  REGISTER_USER: gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $password2: String!, $image:String!) {
    register(username: $username, email: $email, password: $password, password2: $password2, image: $image) {
      email
      token
      loggedIn
      _id
      username
      image
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
        _id
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
        _id
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
  ADD_VIDEO_LIKE: gql`
    mutation VideoLike($videoId: ID!, $userId: ID!) {
      addVideoLike(videoId: $videoId, userId: $userId) {
        _id
      }
    }
  `,
  REMOVE_VIDEO_LIKE: gql`
    mutation VideoRemoveLike($videoId: ID!, $userId: ID!) {
      removeVideoLike(videoId: $videoId, userId: $userId) {
        _id
      }
    }
  `
}