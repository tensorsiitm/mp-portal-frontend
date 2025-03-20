import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:  "https://mpportalserver.tensors.in",
  // uri:  "http://localhost:4000/graphql",

  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
