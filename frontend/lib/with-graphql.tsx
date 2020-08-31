import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";
import session from "types/session";

const WithGraphQL = ({
  session,
  children,
}: {
  session: session;
  children: ReactNode;
}) => {
  const token = session?.jwt?.toString();

  const client = new ApolloClient({
    uri:
      `${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
      "http://localhost:1337/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;
