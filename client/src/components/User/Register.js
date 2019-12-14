import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

const {REGISTER_USER} = Mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="sign-up-form-page">
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    password2: this.state.password2
                  }
                });
              }}
            >
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <input
                value={this.state.password2}
                onChange={this.update("password2")}
                type="password"
                placeholder="Confirm password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;

