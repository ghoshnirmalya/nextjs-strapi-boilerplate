import React, { FC } from "react";
import { ColorModeProvider, LightMode } from "@chakra-ui/core";
import Container from "components/layout/container";
import Navbar from "components/navbar";

const Layout: FC = ({ children }) => {
  return (
    <ColorModeProvider>
      <LightMode>
        <Navbar />
        <Container>{children}</Container>
      </LightMode>
    </ColorModeProvider>
  );
};

export default Layout;
