const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const youtube_key = require("../config/keys").YOUTUBE_KEY;
const models = require("./models/index");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

var search = require('youtube-search');
const app = express();
const cors = require("cors");

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

var opts = {
  maxResults: 10,
  key: youtube_key
};

let videoResults;
search('cats', opts, function (err, results) {
  debugger
  if (err) return console.log(err);
  
  videoResults = results;
});

app.get('/api/videos', (req, res) => res.send({ videoResults }));
app.use(cors());

app.use(bodyParser.json());

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;