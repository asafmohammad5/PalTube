import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoList from './components/videosList/VideoList';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Nav from "./components/Nav";
import AuthRoute from "./util/route_util";
const App = ()=>(
  <div>
      <Nav path="/"/>
    <Switch>
      <AuthRoute path="/login" component={Login} routeType="auth"/>
      <AuthRoute path="/register" component={Register} routeType="auth"/>
      {/* <Route path="/" component={VideoList} /> */}
    </Switch>
  </div>
)

export default App;