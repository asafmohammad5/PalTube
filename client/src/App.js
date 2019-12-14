import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoList from './components/videosList/VideoList';
import Register from "./components/User/Register";
import Login from "./components/User/Login";
const App = ()=>(
  <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={VideoList} />
    </Switch>
  </div>
)

export default App;