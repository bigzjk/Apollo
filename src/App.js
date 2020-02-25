import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { client } from './utils/apolloUtils'

function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    client.query({
      // cache
      query: gql`
        {
          rates(currency: "CNY") {
            currency
          }
        }
      `
    }).then(result => {
      let rates = result.data.rates.splice(0, 20)
      setList(rates)
    });
  }, [])
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {list.map((item, i) => (
          <li key={i}>{i} --- {item.currency}</li>
        ))}
      </div>
    </ApolloProvider>
    
  );
}

export default App;
