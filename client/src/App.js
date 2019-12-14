import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoList from './components/videosList/VideoList';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import NavBar from "./components/NavBar";
import AuthRoute from "./util/route_util";
const App = ()=>(
  <div>
    <Switch>
      <AuthRoute path="/login" component={Login} routeType="auth"/>
      <AuthRoute path="/register" component={Register} routeType="auth"/>
      <NavBar path="/"/>
      {/* <Route path="/" component={VideoList} /> */}
    </Switch>
  </div>
)

export default App;