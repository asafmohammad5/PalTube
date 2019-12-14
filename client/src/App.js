import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoIndex from './components/videosList/VideoIndex';
import Register from "./components/User/Register";

const App = ()=>(
  <div>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/" component={VideoIndex} />
    </Switch>
  </div>
)

export default App;