import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// import { client } from '../../utils/apolloUtils'

function PostData() {
//   const [list, setList] = useState([])
//   useEffect(() => {
//     client.query({
//       // cache
//       query: gql`
//         {
//           rates(currency: "CNY") {
//             currency
//           }
//         }
//       `
//     }).then(result => {
//       let rates = result.data.rates.splice(0, 20)
//       setList(rates)
//     });
//   }, [])
  
  return (
    <Mutation
        mutation={gql`
            mutation AddTodo($type: String!) {
                addTodo(type: $type) {
                    id
                    type
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

    </Mutation>
    
  );
}

export default PostData;
