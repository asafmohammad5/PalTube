import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {HashRouter } from 'react-router-dom';
import App from './App';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({ dataIdFromObject: object => object.id || null});

const client = new ApolloClient({
  link: "http://localhost:5000/graphql",
  cache,
  headers: {
    // pass our token into the header of each request
    authorization: localStorage.getItem("auth-token")
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App/>
      </HashRouter>
    </ApolloProvider>
    )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
