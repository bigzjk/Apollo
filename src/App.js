import React from 'react';
import { ApolloProvider } from 'react-apollo'
import RouterBox from './Router'
import { client } from './utils/apolloUtils'

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterBox />
    </ApolloProvider>
  );
}

export default App;
