import React from 'react'
// import 'whatwg-fetch';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import NavBar from './components/NavBar';
import WorkoutsIndexContainer from './containers/WorkoutsIndexContainer';
import MultipleWeeksContainer from './containers/MultipleWeeksContainer';

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NavBar} >
          <IndexRoute component={WorkoutsIndexContainer} />
          <Route path='/weeks' component={MultipleWeeksContainer}/>
        </Route>
      </Router>
    </div>
  )
}

export default App;
