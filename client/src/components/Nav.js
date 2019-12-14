import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <ApolloConsumer>
    {client => (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        if (data.isLoggedIn) {
          return (
            <button
              onClick={e => {
                e.preventDefault();
                localStorage.removeItem("auth-token");
                client.writeData({ data: { isLoggedIn: false } });
              }}
            >
              Logout
        </button>
          )} else {
          return (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          );
        }
      }}
    </Query> 
    )}
    </ApolloConsumer>
  );

};

export default Nav; 