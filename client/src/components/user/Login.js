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
      password: "",
      error: ""
    };

    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  demoEffect(demoUser, loginUser) {
    const that = this;
    let index = 0;
    const demoIntervalId = setInterval(() => {
      if (index < demoUser.emailOrUsername.length) {
        that.setState({
          emailOrUsername: this.state.emailOrUsername + demoUser.emailOrUsername[index]
        })
      }
      if (index < demoUser.password.length) {
        that.setState({
          password: this.state.password + demoUser.password[index]
        })
      }
      index++;
      if (index > demoUser.password.length && index > demoUser.emailOrUsername.length) {
        clearInterval(demoIntervalId);
        loginUser({ variables: demoUser }).then(() => this.props.history.push("/"));
      }
    }, 200)
  }

  handleDemoSubmit(e, loginUser) {
    e.preventDefault();
    const demoUser = { emailOrUsername: "GuestUser", password: "password" };
    this.demoEffect(demoUser, loginUser)
    
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {

    let src = localStorage.theme === "dark" ? window.darkTheme : window.lightTheme;

    let error;
    if (this.state.error === "password and username is required" ) {
      error = "password and username is required" 
    } else if (this.state.error === "password is required") {
      error = "password is required" 
    } else if (this.state.error === "username is required") {
      error = "username is required"
    } else if (this.state.error === "GraphQL error: Incorrect log in combination") {
      error = "Incorrect log in combination"
    }

    return (
      <Mutation
        onError={error => { this.setState({ error: error.message }) }}
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, _id, username, image, email } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({id: _id, username, image, email}));
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="login-form-page">
            <div className="login-pic">
              <img src="/stylesheets/images/loginpic.png" alt="login"/>
              <p className="login-pic-info">Welcome back to PalTube!</p>
            </div>
            <form
              className="login-form"
              onSubmit={e => {
                e.preventDefault();
                if (this.state.password === "" && this.state.emailOrUsername === "") {
                  this.setState({ error: "password and username is required" })
                  return
                } else if (this.state.password === "") {
                  this.setState({ error: "password is required" })
                  return
                } else if (this.state.emailOrUsername === "") { 
                  this.setState({ error: "username is required" })
                  return
                };
                loginUser({
                  variables: {
                    emailOrUsername: this.state.emailOrUsername,
                    password: this.state.password
                  }
                });
              }}
            >
              <Link to="/"><img className="login-logo" src={src} alt="login"/></Link>
              <p className="form-title">Sign into your account</p>
              <div>{error}</div>
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
                <button type="submit" className="login-button">Sign In</button>
                <button onClick={(e) => this.handleDemoSubmit(e, loginUser)} type="submit" className="demo-button">Guest User</button>
              </div> 
                <Link to="/register" className="link-signup">Sign up instead</Link>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;