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
      password2: "",
      image: "/stylesheets/images/default_avatar_2.png",
      error: ""
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

  updateImage = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.setState({image: reader.result});
    };
    reader.readAsDataURL(file);
  }

  render() {

    let src = localStorage.theme === "dark" ? window.darkTheme : window.lightTheme;

    let error;
    if (this.state.error === "please fill in missing fields") {
      error = "Please fill in missing fields"
    } else if (this.state.error === "GraphQL error: Email is invalid") {
      error = "Invalid email"
    } else if (this.state.error === "GraphQL error: This user already exists") {
      error = "User already exists"
    } else if (this.state.error === "GraphQL error: This username already exists") {
      error = "Username already exists"
    } else if (this.state.error === "GraphQL error: Passwords do not match") {
      error = "Passwords do not match"
    }

    return (
      <Mutation
        onError={error => {  this.setState({ error: error.message }) }}
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token, _id, username, image, email } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({ id: _id, username, image, email }));
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="sign-up-form-page">
              <form
                className="sign-up-form"
                onSubmit={e => {
                  e.preventDefault();
                  if (this.state.password === "" || this.state.username === "" || this.state.email === "" || this.state.password2 === "") {
                    this.setState({ error: "please fill in missing fields" })
                    return
                  } 
                  registerUser({
                    variables: {
                      username: this.state.username,
                      email: this.state.email,
                      password: this.state.password,
                      password2: this.state.password2,
                      image: this.state.image
                    }
                  });
                }}
              >
                <Link to="/"><img className="signup-logo" src={src} alt="signup"/></Link>
                <p className="form-title">Create your PalTube Account</p>
                <div>{error}</div>
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
              <input type="file" onChange={this.updateImage} className="signup-password2"/>
              
                <div className="signup-direct">
                  <Link to="/login" className="link-login">Sign in instead</Link>
                  <button type="submit" className="signup-button">Sign up</button>
                </div> 
              </form>
              <div className="signup-pic">
              <img src={this.state.image} className="signup-avatar"/>
                <img src="/stylesheets/images/signuppic.png" alt="signup" />
                <p className="signup-pic-info">Join. Watch. Laugh.</p>
              </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;

