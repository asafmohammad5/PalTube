const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const AuthService = require("../services/auth")
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        password2: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, data) {
        return AuthService.register(data);
      }
    },
    login: {
      type: UserType,
      args: {
        username: {type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;