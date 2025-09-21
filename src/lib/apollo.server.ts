import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function makeServerClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "https://graphql-pokemon2.vercel.app/",
      fetch,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Pokemon: { keyFields: ["id"] },
      },
    }),
  });
}
