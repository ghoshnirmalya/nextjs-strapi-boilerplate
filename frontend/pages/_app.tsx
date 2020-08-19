import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import Layout from "components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
