const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  keywords: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true
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
});

VideoSchema.statics.searchVideos = (criteria) => {
  const regCriteria = new RegExp(criteria, 'i');

  const Video = mongoose.model("videos");
  return Video.find({
    "$or": [
      { "keywords": { $regex: regCriteria } },
      { "category": { $regex: regCriteria } },
      { "title": { $regex: regCriteria } }]
  })
    .sort({ keywords: -1, category: -1, title: -1 })
    .then(videos => videos);
};

module.exports = mongoose.model("videos", VideoSchema);