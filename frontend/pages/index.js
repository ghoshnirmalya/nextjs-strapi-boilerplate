import Page from "components/pages/index";
import WithGraphQL from "lib/with-graphql";
import Head from "next/head";
import React from "react";

const Home = () => {
  return (
    <WithGraphQL>
      <Head>
        <title>My Account Page</title>
      </Head>
      <Page />
    </WithGraphQL>
  );
};

export default Home;
