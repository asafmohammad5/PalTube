import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
  `,
  REGISTER_USER: gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $password2: String!) {
    register(username: $username, email: $email, password: $password, password2: $password2) {
      email
      token
      loggedIn
    }
  }
 `
}