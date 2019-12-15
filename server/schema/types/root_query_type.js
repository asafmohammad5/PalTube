const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID,
  GraphQLString, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");
const Video = mongoose.model("videos");
const VideoType = require("./video_type");

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
      args: { criteria: { type: GraphQLString } },
      resolve(_, args) {
        if (args.criteria) {
          return Video.searchVideos(args.criteria);
        } else {
          return Video.find({});
        }
      }
    },
    video: {
      type: VideoType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Video.findById(args._id)
      }
    }
  })
});

module.exports = RootQueryType;