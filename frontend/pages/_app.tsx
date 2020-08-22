import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import Layout from "components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <NextAuthProvider session={session}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </NextAuthProvider>
    </>
  );
};

export default App;
