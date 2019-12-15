const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID,
  GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");

const VideoType = require("./video_type");
const Video = mongoose.model("videos");

const CommentType = require("./comment_type");
const Comment = mongoose.model("comments");

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
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    videos: {
      type: new GraphQLList(VideoType),
      resolve() {
        return Video.find({});
      }
    },
    video: {
      type: VideoType,
      args: { _id: {type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Video.findById(args._id)
      }
    },
    comment: {
      type: CommentType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Comment.findById(args._id)
      }
    }
  })
});

module.exports = RootQueryType;