const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const CommentType = require("./types/comment_type");
const Comment = mongoose.model("comments");
const AuthService = require("../services/auth");

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
        emailOrUsername: {type: GraphQLString },
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
    },
    addVideoComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) },
        videoId: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(_, {text, author, videoId}) {
        return Comment.addVideoComment(videoId, text, author);
      }
    },
    addReplyComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) },
        parentCommentId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, {text, author, parentCommentId}) {
        return Comment.addReplyComment(parentCommentId, text, author)
      }
    }
  }
});

module.exports = mutation;