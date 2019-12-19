const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  videos_liked: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ],
  favoriteVideos: [
  {
    type: Schema.Types.ObjectId,
    ref: "videos"
  }
],
  videos_disliked: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  }, 
  image: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("users", UserSchema);