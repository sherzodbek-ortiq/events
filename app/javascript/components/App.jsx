import React from "react"
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import EventsMain from './events/EventsMain';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={EventsMain} />
        </Switch>
      </Router>
    );
  }
}

export default App