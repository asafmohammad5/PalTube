const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const CommentType = require("./types/comment_type");
const VideoType = require("./types/video_type");
const Comment = mongoose.model("comments");
const Video = mongoose.model("videos");
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
        password2: { type: new GraphQLNonNull(GraphQLString) },
        image:{type: GraphQLString}
      },
      resolve(parentValue, data) {
        return AuthService.register(data);
      }
    },
    login: {
      type: UserType,
      args: {
        emailOrUsername: { type: GraphQLString },
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
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        gif: { type: GraphQLString }
      },
      resolve(_, { text, author, videoId, gif }) {
        return Comment.addVideoComment(videoId, text, author, gif)
      }
    },
    addReplyComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) },
        parentCommentId: { type: new GraphQLNonNull(GraphQLID) },
        gif: { type: GraphQLString }
      },
      resolve(_, { text, author, parentCommentId, gif }) {
        return Comment.addReplyComment(parentCommentId, text, author, gif)
      }
    },
    replyReplyComment: {
      type: CommentType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLID) },
        parentCommentId: { type: new GraphQLNonNull(GraphQLID) },
        replyTo: { type: GraphQLString },
        gif: { type: GraphQLString }
      },
      resolve(_, { text, author, parentCommentId, gif, replyTo }) {
        return Comment.replyReplyComment(parentCommentId, text, author, gif, replyTo)
      }
    },
    deleteComment: {
      type: CommentType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve(parentValue, { id }) {
        return Comment.remove({ _id: id });
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLString },
      },
      resolve(parentValue, { id, text}) {
        const updateObj = {};

        if (id) updateObj.id = id;
        if (text) updateObj.text = text;
        if (id) updateObj.date = Date.now()

        return Comment.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, comment) => {
            return comment;
          }
        );
      }
    },
    addVideoLike: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { videoId, userId }) { 
        return Video.addLike(videoId, userId);
      }
    },
    removeVideoLike: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { videoId, userId }) {
        return Video.removeLike(videoId, userId);
      }
    },
    addVideoDislike: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { videoId, userId }) {
        return Video.addDislike(videoId, userId);
      }
    },
    removeVideoDislike: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { videoId, userId }) {
        return Video.removeDislike(videoId, userId);
      }
    },
    addFavoriteVideo: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { videoId, userId }) {
        return Video.addFavorite(videoId, userId);
      }
    },
    removeFavoriteVideo: {
      type: VideoType,
      args: {
        videoId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { videoId, userId }) {
        return Video.removeFavorite(videoId, userId);
      }
    }
  }
});

module.exports = mutation;