import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $password2: String!) {
    register(name: $name, email: $email, password: $password, password2: $password2) {
      email
      token
      loggedIn
    }
  }
 `
}