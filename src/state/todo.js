import gql from 'graphql-tag';

export const todoInitState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};
  
export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;
export const todoTypeDefs = {
  dataType: `type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }`,
  mutationType: `
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  `,
  queryType: `type Query {
    visibilityFilter: String
    todos: [Todo]
  }`
}

let nextTodoId = 0;

export const TodoMutation = {
  addTodo: (_, { text }, { cache }) => {
    const query = gql`
      query GetTodos {
        todos @client {
          id
          text
          completed
        }
      }
    `;
    const previous = cache.readQuery({ query });
    const newTodo = {
      id: nextTodoId++,
      text,
      completed: false,
      __typename: 'TodoItem',
    };
    const data = {
      todos: previous.todos.concat([newTodo]),
    };
    cache.writeData({ data });
    return newTodo;
  },
  toggleTodo: (_, variables, { cache }) => {
    const id = `TodoItem:${variables.id}`;
    const fragment = gql`
      fragment completeTodo on TodoItem {
        completed
      }
    `;
    const todo = cache.readFragment({ fragment, id });
    const data = { ...todo, completed: !todo.completed };
    cache.writeData({ id, data });
    return null;
  },
}
