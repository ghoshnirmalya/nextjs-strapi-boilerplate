import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider  } from "next-auth/react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import Layout from "components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default App;
