// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { ReactNode } from "react";

// const WithGraphQL = ({ children }: { children: ReactNode }) => {
//   const client = new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/graphql",
//     cache: new InMemoryCache(),
//   });

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

// export default WithGraphQL;

import fetch from "isomorphic-unfetch";
import { Client, defaultExchanges, Provider } from "urql";
import { ReactNode } from "react";
import session from "types/session";

const WithGraphQL = ({
  session,
  children,
}: {
  session: session;
  children: ReactNode;
}) => {
  const userIdInString = session.id.toString();

  const client = new Client({
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/graphql",
    fetch,
    fetchOptions: {
      headers: { "X-User-Id": userIdInString },
    },
    requestPolicy: "cache-and-network",
    exchanges: [...defaultExchanges],
  });

  return <Provider value={client}>{children}</Provider>;
};

export default WithGraphQL;
