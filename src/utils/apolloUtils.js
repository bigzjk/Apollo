import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http'
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { RetryLink } from "apollo-link-retry";
// import gql from 'graphql-tag';

export const apolloCache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'DisplayUserInfo':
        return object['userID']; // use `key` as the primary key
      default:
        return defaultDataIdFromObject(object)
    }
  }
})

export const client = new ApolloClient({
  cache: apolloCache,
  // link: createHttpLink({
  //   uri: 'http://192.168.14.19:9041/graphql' 
  // }),
  link: ApolloLink.from([
    // logger
    //apolloLogger,
    // error
    new HttpLink({
      uri: 'https://48p1r2roz4.sse.codesandbox.io'
      // credentials: 'include'
    }),
    onError((error) => {
      const {graphQLErrors, networkError} = error;
      if (graphQLErrors) {
          console.log('graphQLErrors', graphQLErrors);
      //   graphQLErrors.map((err) => {
      //     const errcode = _getIn(err, 'extensions', 'errcode')
      //     if (errcode) {
      //       if (errcode === 1029 || errcode === 1028) {
      //         // AntMessage.error(errorHandler(errcode));
      //         // window.location.href = '/landing/login'
      //       }
      //     }
      //   })
      }

      if (networkError) {
        // document.dispatchEvent(networkErrorEvent)
        // remove cached token on 401 from the server
        // console.log(JSON.stringify(networkError), ' - - - - - resolving network error!', options);
        console.log(networkError.name, ' - - - -  -- -- this is network name!');

        if (networkError.name === 'ServerError' && networkError.statusCode === 401) {
          localStorage.removeItem('AUTH_TOKEN')
        }
      }
    }),
    new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true
      },
      attempts: (count, operation, error) => {
        console.log(`第${count}次重试${operation.operationName}`)
        return ['QueryTeamInvite', 'QueryTeamInfo'].indexOf(operation.operationName) > -1 ? count < 5 : !!error && count < 6
      }
    }),
    // auth
    setContext((_, {headers}) => {
      // let token = cache.store.get('userToken');
      
      return {
        headers: {
          ...headers,
          // authorization: token ? `Bearer ${token}` : "",
        },
      }
    })
  ]),
})
