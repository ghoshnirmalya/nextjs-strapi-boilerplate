import React from "react";
import Head from "next/head";
import Page from "components/pages/index";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Page />
    </>
  );
};

export default IndexPage;
