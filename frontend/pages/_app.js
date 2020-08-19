import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import Layout from "components/layout";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
