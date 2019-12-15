const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Video = require("../../models/Video");
const CommentType = require("./comment_type");

const VideoType = new GraphQLObjectType({
  name: "VideoType",
  fields: () => ({
    _id: { type: GraphQLString },
    keywords: { type: GraphQLString },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Video.findById(parentValue.id)
          .populate("comments")
          .then(video => video.comments);
      }
    }
  })
});

module.exports = VideoType;