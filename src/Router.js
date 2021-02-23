import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import List from './pages/list'
import Todo from './pages/todo/index.js'
import Test from './pages/test'

function RouterBox() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={List}></Route>
          <Route path="/test" exact component={Test} />
          <Route path="/todo" exact component={Todo} />
      </Switch>
    </Router>
  );
}

export default RouterBox;
