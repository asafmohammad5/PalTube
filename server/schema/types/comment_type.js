const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const Comment = require("../../models/Comment");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    _id: { type: GraphQLString },
    text: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLString },
    gif: { type: GraphQLString },
    replyTo: { type: GraphQLString },
    author: { 
      type: require("./user_type"),
      resolve(parentValue) {
        return Comment.findById(parentValue._id)
          .populate("author")
          .then(comment => {
            return comment.author;
          })
    }},
    replies: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Comment.findById(parentValue.id)
          .populate("replies")
          .then(comment => comment.replies);
      }
    }
  })
});

module.exports = CommentType;