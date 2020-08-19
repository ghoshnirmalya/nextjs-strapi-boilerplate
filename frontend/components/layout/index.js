import { ColorModeProvider, LightMode } from "@chakra-ui/core";
import Container from "components/layout/container";
import React from "react";

const Layout = ({ children }) => {
  return (
    <ColorModeProvider>
      <LightMode>
        <Container>{children}</Container>
      </LightMode>
    </ColorModeProvider>
  );
};

export default Layout;
