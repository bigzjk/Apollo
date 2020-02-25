import React, { useEffect, useState } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { client } from '../../utils/apolloUtils'

function GetData() {
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
    <Query
        query={gql`
            {
            rates(currency: "USD") {
                currency
                rate
                name
            }
        }
        `}
    >{
        ({loading, error, data}) => {
             if(loading) return <div>加载中。。。。</div> 
             if(error) return <div>失败</div> 
             if (data) {
                let rates = data.rates.splice(0, 20)

                 console.log(data.rates.splice(0,20));
                 return (
                 <div>
                     {rates.map((item, i) => (
                         <div key={i}>{item.name}</div>
                     ))}
                 </div>
             )} 
        }
    }

    </Query>
    
  );
}

export default GetData;
