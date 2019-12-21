const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Video = require("../../models/Video");
const CommentType = require("./comment_type");
const UserType = require("./user_type");

const VideoType = new GraphQLObjectType({
  name: "VideoType",
  fields: () => ({
    _id: { type: GraphQLString },
    keywords: { type: GraphQLString },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    likes: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return Video.findById(parentValue.id)
          .populate("likes")
          .then(video => video.likes);
      }
    },
    dislikes: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return Video.findById(parentValue.id)
          .populate("dislikes")
          .then(video => video.dislikes);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Video.findById(parentValue.id)
          .populate("comments")
          .then(video => video.comments.sort((a, b) => b.date - a.date))
      }
    }, 
    favoriteBy: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return Video.findById(parentValue.id)
          .populate("favoriteBy")
          .then(video => video.favoriteBy);
      }
    },
  })
});

module.exports = VideoType;