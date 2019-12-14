import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
import Nav from "./Nav";
const { IS_LOGGED_IN } = Queries;

const NavBar = props => {
  return (
    <div className="navbar">
      <Link to="/"><img className="navbar-logo" src="/stylesheets/images/paltube.png" /></Link>
      <Nav/>
    </div>
    );
};

export default NavBar; 