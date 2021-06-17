import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const directionalLink = new RetryLink().split(
  (operation) => operation.getContext().name === "weather",
  new HttpLink({ uri: "https://graphql-weather-api.herokuapp.com/" }),
  new HttpLink({ uri: "https://graphql.country/graphql" })
);

// Initialize Apollo Client
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});
