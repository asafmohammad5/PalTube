const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

const VideoType = new GraphQLObjectType({
  name: "VideoType",
  fields: () => ({
    _id: { type: GraphQLString },
    keywords: { type: GraphQLString },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

module.exports = VideoType;