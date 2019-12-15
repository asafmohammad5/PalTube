import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";

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
          const { token, _id, username } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({ id: _id, username }));
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="sign-up-form-page">
              <form
                className="sign-up-form"
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
                <Link to="/"><img className="signup-logo" src="/stylesheets/images/paltube.png" /></Link>
                <p className="form-title">Create your PalTube Account</p>
                <input
                  value={this.state.username}
                  onChange={this.update("username")}
                  placeholder="Username"
                  className="signup-username"
                />
                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  className="signup-email"
                />
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                  className="signup-password"
                />
                <input
                  value={this.state.password2}
                  onChange={this.update("password2")}
                  type="password"
                  placeholder="Confirm"
                  className="signup-password2"
                />
                <div className="signup-direct">
                  <Link to="/login" className="link-login">Sign in instead</Link>
                  <button type="submit" className="signup-button">Sign up</button>
                </div> 
              </form>
              <div className="signup-pic">
                <img src="/stylesheets/images/signuppic.png" />
                <p className="signup-pic-info">Join. Watch. Laugh.</p>
              </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;

