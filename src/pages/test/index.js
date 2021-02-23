import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './Todo';
import { client } from '../../utils/apolloUtils'

const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
  }
`;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const Test = () => {

    useEffect(() => {
        // client.query({
        //   query: gql`
        //     {
        //       rates(currency: "CNY") {
        //         currency
        //       }
        //     }
        //   `
        // }).then(result => {
        //   let rates = result.data.rates.splice(0, 20)
        //   console.log('rates', rates);
        // });
        client.query({
            query: GET_TODOS
          }).then(result => {
            console.log('result', result);
          });
      }, [])

  return <Query query={GET_TODOS}>
    {({ data: { todos, visibilityFilter } }) => {
      console.log('todos---', todos);
    return(
      <ul>
        {getVisibleTodos(todos, visibilityFilter).map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    )}}
  </Query>
};

export default Test;
