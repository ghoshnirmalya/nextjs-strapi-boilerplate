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
  const token = session?.jwt?.toString();

  const client = new Client({
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/graphql",
    fetch,
    fetchOptions: {
      headers: { Authorization: `Bearer ${token}` },
    },
    requestPolicy: "cache-and-network",
    exchanges: [...defaultExchanges],
  });

  return <Provider value={client}>{children}</Provider>;
};

export default WithGraphQL;
