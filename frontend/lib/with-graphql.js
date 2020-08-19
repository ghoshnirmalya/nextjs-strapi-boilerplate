import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const WithGraphQL = ({ children }) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGraphQL;
