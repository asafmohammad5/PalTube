import React from 'react'
import { Route, Switch} from 'react-router-dom';
import VideoList from './components/videosList/VideoList';

const App = ()=>(
  <div>
    <Switch>
      <Route path="/" component={VideoList}/>
    </Switch>
  </div>
)

export default App;