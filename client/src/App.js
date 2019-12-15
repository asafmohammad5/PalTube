import React from 'react'
import { Route, Switch } from 'react-router-dom';
import VideoIndex from './components/videosList/VideoIndex';
import VideoDetail from './components/videosList/VideoDetail';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import NavBar from "./components/NavBar";
import AuthRoute from "./util/route_util";

const App = () => (
  <div>
    <NavBar path="/" />
    <Switch>
      <AuthRoute path="/register" component={Register} routeType="auth" />
      <Route exact path="/" component={VideoIndex} />
      <Route  path="/videos/:id" component={VideoDetail} />
      <AuthRoute path="/login" component={Login} routeType="auth" />
    </Switch>
  </div>
)

export default App;