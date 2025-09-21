"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";

export const makeClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql-pokemon2.vercel.app/",
      fetchOptions: { cache: "default" },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Pokemon: { keyFields: ["id"] },
      },
    }),
  });

export const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  const client = makeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
