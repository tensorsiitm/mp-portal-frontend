import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://206.189.131.226:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
