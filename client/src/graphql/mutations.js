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
    mutation VideoComment($text: String!, $author: ID!, $videoId: ID!, $gif: String!) {
      addVideoComment(text: $text, author: $author, videoId: $videoId, gif: $gif) {
        _id
        text
        author {
          username
          image
        }
        replies {
          _id  
        }
        date
        gif
      }
    }
  `,
  REPLY_COMMENT: gql`
    mutation ReplyComment($text: String!, $author: ID!, $parentCommentId: ID!, $gif: String!) {
      addReplyComment(text: $text, author: $author, parentCommentId: $parentCommentId, gif: $gif) {
        _id
        text
        author {
          username
          image
        }
        replies {
          _id  
        }
        date
        gif
      }
    }
  `,
  DELETE_COMMENT: gql`
    mutation DeleteComment($id: ID!) {
      deleteComment(id: $id) {
        _id
      }
    }
  `,
  UPDATE_COMMENT: gql`
  mutation UpdateComment($id: ID!, $text: String) {
    updateComment(id: $id, text: $text) {
      _id
      text
      date
      author {
        username
        image
      }
      replies {
        _id
       }
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
  `,
  ADD_VIDEO_DISLIKE: gql`
    mutation VideoDislike($videoId: ID!, $userId: ID!) {
      addVideoDislike(videoId: $videoId, userId: $userId) {
        _id
      }
    }
  `,
  REMOVE_VIDEO_DISLIKE: gql`
    mutation VideoRemoveDislike($videoId: ID!, $userId: ID!) {
      removeVideoDislike(videoId: $videoId, userId: $userId) {
        _id
      }
    }
  `
}