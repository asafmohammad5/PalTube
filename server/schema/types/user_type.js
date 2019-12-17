const mongoose = require("mongoose");
const graphql = require("graphql");
const User = require("../../models/User");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList,
  GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    image: { type: GraphQLString },
    videos_liked: {
      type: new GraphQLList(require("./video_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("videos_liked")
          .then(user => user.videos_liked);
      }
    }
  })
});

module.exports = UserType;