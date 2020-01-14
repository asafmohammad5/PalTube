# PalTube

[Live link](https://limitless-ocean-39156.herokuapp.com/#/)

### Technologies, Libraries and APIs

- React
- Express
- GraphQL
- GraphQL-Apollo
- HTML
- MongoDB
- NodeJS
- Mongoose
- Validate
- Youtube API V3
- Giphy API

### Sample Code from the Backend

```javascript
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    videos: {
      type: GraphQLList(VideoType),
      args: {
        criteria: { type: GraphQLString },
        perPage: { type: GraphQLInt },
        pageNumber: { type: GraphQLInt }
      },
      resolve(_, args) {
        return Video.searchVideos(args.criteria, args.perPage, args.pageNumber);
      }
    },
    video: {
      type: VideoType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Video.findById(args._id);
      }
    },
    comment: {
      type: CommentType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Comment.findById(args._id);
      }
    }
  })
});
```

### Sample code from Frontend

```javascript
<Mutation
  mutation={UPDATE_COMMENT}
  refetchQueries={() => {
    return [
      {
        query: FETCH_VIDEO,
        variables: { id: this.props.videoId }
      }
    ];
  }}
>
  {(updateComment, { data }) => (
    <div>
      <form
        className="delete-button"
        onSubmit={e => this.handleSubmit(e, updateComment)}
      >
        <button type="submit">Delete</button>
      </form>
    </div>
  )}
</Mutation>
```

### Screenshots

![themes](https://github.com/asafmohammad5/PalTube/blob/master/readme_docs/themes.gif)

![navigation](https://github.com/asafmohammad5/PalTube/blob/master/readme_docs/navigation.gif)

![filteration](https://github.com/asafmohammad5/PalTube/blob/master/readme_docs/filteration.gif)

## Fetatures

PalTube is is a platform for pet videos inspired by Youtube.  
Everyone loves pets. In fact some people would rather spend time with them then other people. Here at PalTube we give you just that! A mulititude of videos that show off our furry (or furrless) friends adorable nature. If you love animals, or just want to see something that will brighten your day, head on over to PalTube and start your day with a smile.

PalTube will use YouTube pet videos as seed data. The content will be dynamic and change based on how the user interacts with the app. Users will be able to create accounts, like/dislike videos, add comments to videos, search for pet videos, and upload pet videos. The pet videos will be organized in categories on the splash page, each video taking you to the video show page. The video show pages will dispaly users comments and likes/dislikes.

- User authorization: sign up and log in
- Saving of user likes to Mongo database
- Saving of user comments to the database
- Uploading of videos to YouTube, saving ids to the database
- User favorites, liked, and uploaded page
- User sidebar for navigation
- Search functionality of videos
- Displaying nested comments on the Video Show page
- Using Google's API V3 to show videos
- Using Giphy API for comments and replies
