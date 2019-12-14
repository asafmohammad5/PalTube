const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, 
  GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");

const VideoType = require("./video_type");
const Video = mongoose.model("videos");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    videos: {
      type: GraphQLList(VideoType),
      resolve(_, args) {
        return Video.find({});
      }
    },
  })
});

module.exports = RootQueryType;