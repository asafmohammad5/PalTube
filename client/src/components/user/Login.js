import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="login-form-page">
            <div className="login-pic">
              <img src="/stylesheets/images/loginpic.png" />
              <p className="login-pic-info">Welcome back to PalTube!</p>
            </div>
            <form
              className="login-form"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    emailOrUsername: this.state.emailOrUsername,
                    password: this.state.password
                  }
                });
              }}
            >
              <Link to="/"><img className="login-logo" src="/stylesheets/images/paltube.png" /></Link>
              <p className="form-title">Sign into your account</p>
              <input
                value={this.state.emailOrUsername}
                onChange={this.update("emailOrUsername")}
                placeholder="Email or Username"
                className="login-email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
                className="login-password"
              />
              <div className="login-direct">
                <Link to="/register" className="link-login">Sign up instead</Link>
                <button type="submit" className="login-button">Sign In</button>
              </div> 
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;