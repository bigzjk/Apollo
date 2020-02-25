import React from 'react';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { client } from './utils/apolloUtils'

import GetData from './pages/getData'
import PostData from './pages/postData'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
              <Route path="/" exact component={GetData}></Route>
              <Route path="/post" component={PostData}></Route>
        </Switch>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
