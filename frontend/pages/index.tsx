import React from "react";
import Head from "next/head";
import Page from "components/pages/index";
import { NextPage } from "next";
import WithGraphQL from "lib/with-graphql";

const IndexPage: NextPage = () => {
  return (
    <WithGraphQL>
      <Head>
        <title>Index Page</title>
      </Head>
      <Page />
    </WithGraphQL>
  );
};

export default IndexPage;
