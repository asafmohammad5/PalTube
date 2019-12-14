import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoIndex from './components/videosList/VideoIndex';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import NavBar from "./components/NavBar";
import AuthRoute from "./util/route_util";
const App = ()=>(
  <div>
    <Switch>
      <Route path="/" component={VideoIndex} />
      <AuthRoute path="/login" component={Login} routeType="auth"/>
      <AuthRoute path="/register" component={Register} routeType="auth"/>
      <NavBar path="/"/>
    </Switch>
  </div>
)

export default App;