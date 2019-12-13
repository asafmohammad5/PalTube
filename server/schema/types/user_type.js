const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
  })
});

module.exports = UserType;