import React from 'react';
import { Route, Switch } from 'react-router-dom';
import VideoIndex from './components/Videos/VideoIndex';
import VideoDetail from './components/Videos/VideoDetail';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import AuthRoute from "./util/route_util";
import VideoSearch from './components/Videos/VideoSearch';
import LikedVideos from './components/Videos/LikedVideos';
import FavoriteVideos from './components/Videos/FavoriteVideos';
import UserProfile from "./components/User/Profile";

const App = () => {
 return(
  <div>
    <Switch>
      <AuthRoute path="/register" component={Register} routeType="auth" />
       <Route exact path="/" component={VideoIndex} />
       <Route exact path="/videos/likes" component={LikedVideos} />
       <Route exact path="/videos/favorites" component={FavoriteVideos} />
       <AuthRoute path="/profile/:userId" component={UserProfile} routeType="profile"/>
       <Route  path="/videos/:id" component={VideoDetail} />
       <Route path="/search/:criteria" component={VideoSearch} />
      <AuthRoute path="/login" component={Login} routeType="auth" />
    </Switch>
  </div>
 )}

export default App;