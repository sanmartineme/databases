import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Reference: https://github.com/mreorhan/Yelp-Graphql-Integration-with-Apollo-Client/blob/master/App.js

const API_URL = "https://api.yelp.com/v3/graphql";
const API_TOKEN =
  "rudCpUziqfJXxJ6fBlRSBzshsXbEs_dRbP7NSJPaHs_-KGwDuQDBNme8tTpK_f73c3AkFCry23hZ1eDYMP3rLRB-GLmQ1nkKUveWjbLyMWzcpJjpLUYA4AqXycLEYHYx";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${API_TOKEN}`,
      "accept-language": "en_US",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(
    ApolloLink.from([
      onError(({ graphQLErrors, networkError }: any) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }: any) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: API_URL,
        credentials: "same-origin",
      }),
    ])
  ),
  cache: new InMemoryCache(),
});
