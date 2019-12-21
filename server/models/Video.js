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
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  favoriteBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});


VideoSchema.statics.addLike = (videoId, userId) => {
  const Video = mongoose.model("videos");
  const User = mongoose.model("users");

  return Video.findById(videoId).then(video => {
    return User.findById(userId).then(user => {
      video.dislikes.pull(user._id);
      video.likes.push(user._id);
      user.videos_liked.push(video);
      user.videos_disliked.pull(video);
      return Promise.all([video.save(), user.save()]).then(
        ([video, user]) => {
          return user;
        }
      );
    });
  });
};

VideoSchema.statics.removeLike = (videoId, userId) => {
  const Video = mongoose.model("videos");
  const User = mongoose.model("users");

  return Video.findById(videoId).then(video => {
    return User.findById(userId).then(user => {
      video.likes.pull(user);
      user.videos_liked.pull(video);

      return Promise.all([video.save(), user.save()])
        .then(([video, user]) => {
          return user;
        });
    });
  });
};

VideoSchema.statics.addDislike = (videoId, userId) => {
  const Video = mongoose.model("videos");
  const User = mongoose.model("users");

  return Video.findById(videoId).then(video => {
    return User.findById(userId).then(user => {
      video.likes.pull(user._id);
      video.dislikes.push(user._id);
      user.videos_disliked.push(video);
      user.videos_liked.pull(video);
      return Promise.all([video.save(), user.save()]).then(
        ([video, user]) => {
          return user;
        }
      );
    });
  });
};

VideoSchema.statics.removeDislike = (videoId, userId) => {
  const Video = mongoose.model("videos");
  const User = mongoose.model("users");

  return Video.findById(videoId).then(video => {
    return User.findById(userId).then(user => {
      video.dislikes.pull(user);
      user.videos_disliked.pull(video);

      return Promise.all([video.save(), user.save()])
        .then(([video, user]) => {
          return user;
        });
    });
  });
};


VideoSchema.statics.searchVideos = (criteria, perPage, pageNumber) => {
  const Video = mongoose.model("videos");
  if(!criteria){
    return Video.find({})
    .limit(perPage)
    .skip(perPage * pageNumber)
    .then(videos => videos)
  };
  const regCriteria = new RegExp(criteria, 'i');
  return Video.find({
    "$or": [
      { "keywords": { $regex: regCriteria } },
      { "category": { $regex: regCriteria } },
      { "title": { $regex: regCriteria } }
    ]
  })
    .limit(perPage)
    .skip(perPage * pageNumber)
    .sort({ keywords: -1, category: -1, title: -1 })
    .then(videos => videos);
};

VideoSchema.statics.addFavorite = async (videoId, userId) => {
  const VideoModel = mongoose.model("videos");
  const UserModel = mongoose.model("users");

  let video = await VideoModel.findById(videoId);
  let user = await UserModel.findById(userId);

  let isExist = user.favoriteVideos.includes(video.id)

  if (isExist) {
    throw new Error("video already in your favorite list");
  } else {
    video.favoriteBy.push(user._id);
    user.favoriteVideos.push(video);
    return Promise.all([video.save(), user.save()]).then(
      ([video, user]) => {
        return video;
      }
    );
  }
};


VideoSchema.statics.removeFavorite = (videoId, userId) => {
  const Video = mongoose.model("videos");
  const User = mongoose.model("users");
  return Video.findById(videoId).then(video => {
    return User.findById(userId).then(user => {
      video.favoriteBy.pull(user._id);
      user.favoriteVideos.pull(video);
      return Promise.all([video.save(), user.save()]).then(
        ([video, user]) => {
          return video;
        }
      );
    });
  });
};

module.exports = mongoose.model("videos", VideoSchema);