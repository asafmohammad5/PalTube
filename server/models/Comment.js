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
  },
  gif: {
    type: String,
    required: false
  },
  replyTo: {
    type: String,
    required: false
  }
});

CommentSchema.statics.addReplyComment = (parentCommentId, text, author, gif) => {
  const Comment = mongoose.model("comments");

  return Comment.findById({
    _id: parentCommentId
  }).then(comment => {
    const child = new Comment({text, author, gif})
    comment.replies.push(child);
    return Promise.all([child.save(), comment.save()])
      .then(([child, comment]) => child).catch(err => err.message)
  })
}

CommentSchema.statics.replyReplyComment = (parentCommentId, text, author, gif, replyTo) => {
  const Comment = mongoose.model("comments");

  return Comment.findById({
    _id: parentCommentId
  }).then(comment => {
    const child = new Comment({ text, author, gif, replyTo })
    comment.replies.push(child);
    return Promise.all([child.save(), comment.save()])
      .then(([child, comment]) => child).catch(err => err.message)
  })
}


CommentSchema.statics.addVideoComment = async (videoId, text, author, gif) => {
  const Video = mongoose.model("videos");
  const Comment = mongoose.model("comments");

 
  return Video.findById({
    _id: videoId
  }).then(video => {
    const comment = new Comment({ text, author, gif })
    video.comments.push(comment)
    return Promise.all([comment.save(), video.save()])
      .then(([comment, video]) => comment).catch(err => err.message)
  })
}

module.exports = mongoose.model("comments", CommentSchema);