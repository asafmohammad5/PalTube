# PalTube
A platform for pet videos.

[Live link](https://limitless-ocean-39156.herokuapp.com/#/)



# Background and Overview

PalTube is a pet video platfrom inspired by YouTube.

Everyone loves pets. In fact some people would rather spend time with them then other people. Here at PalTube we give you just that! A mulititude of videos that show off our furry (or furrless) friends adorable nature. If you love animals, or just want to see something that will brighten your day, head on over to PalTube and start your day with a smile. 

PalTube will use YouTube pet videos as seed data. The content will be dynamic and change based on how the user interacts with the app. Users will be able to create accounts, like/dislike videos, add comments to videos, search for pet videos, and upload pet videos. The pet videos will be organized in categories on the splash page, each video taking you to the video show page. The video show pages will dispaly users comments and likes/dislikes.

# Functionality, API's and MVP
 * User authorization: sign up and log in
 * Saving of user likes and comments to the Mongo database
 * YouTube API, Giphy API
 * YouTube video upload via API calls for seed data, saving ids to the database
 * User favorites, liked, and uploaded page
 * User sidebar for navigation
 * Search functionality of videos
 * User Profile page
 * Production README


# Technologies and Challenges

### Technologies
* React
* Express
* GraphQL-Apollo
* HTML
* CSS
* MongoDB
* NodeJS
* YouTube API
* Giphy API

# Sample Code



```
  VIDEO_COMMENT: gql`
    mutation VideoComment($text: String!, $author: ID!, $videoId: ID!, $gif: String!) {
      addVideoComment(text: $text, author: $author, videoId: $videoId, gif: $gif) {
        _id
        text
        author {
          _id
          username
          image
        }
        replies {
          _id  
        }
        date
        gif
      }
    }
  `
```
-------------
```
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
    }
```


# Sample Pictures

![GitHub Logo](/client/public/stylesheets/images/paltube-main.png)

![GitHub Logo](/client/public/stylesheets/images/paltube-search.png)
