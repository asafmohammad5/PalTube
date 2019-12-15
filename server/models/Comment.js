const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  replies: [
      {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.statics.addReplyComment = (parentCommentId, text, author) => {
  const Comment = mongoose.model("comments");

  return Comment.find({
    _id: parentCommentId
  }).then(comment => {
    const child = new Comment(text, author).save(); 
    comment.replies.push(child._id);
    comment.save();

    return comment;
  })
}

CommentSchema.statics.addVideoComment = (videoId, text, author) => {
  const Video = mongoose.model("videos");
  const Comment = mongoose.model("comments");

  return Video.find({
    _id: videoId
  }).then(video => {
    const comment = new Comment(text, author).save();
    video.comments.push(comment._id);
    video.save();

    return video;
  })
}

module.exports = mongoose.model("comments", CommentSchema);