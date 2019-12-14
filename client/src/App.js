import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoIndex from './components/videosList/VideoIndex';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import AuthRoute from "./util/route_util";
import { getArgumentValues } from 'graphql/execution/values';

const App = ()=>(
  <div>     
    <Switch>
      <Route exact path="/" component={VideoIndex} />
      <AuthRoute path="/login" component={Login} routeType="auth"/>
      <AuthRoute path="/register" component={Register} routeType="auth"/>
    </Switch>
  </div>
)

export default App;