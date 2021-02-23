import { TodoMutation, todoInitState, todoTypeDefs } from './todo'

export const initState = {
  ...todoInitState,
};

export const resolvers = {
  Mutation: {
    ...TodoMutation,
  },
};

export const typeDefs = `
  ${todoTypeDefs.dataType}
  type Mutation {
    ${todoTypeDefs.mutationType}
  }
  type Query {
    ${todoTypeDefs.queryType}
  }
`;
