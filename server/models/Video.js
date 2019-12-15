const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  keywords: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ]
})

module.exports = mongoose.model("videos", VideoSchema);