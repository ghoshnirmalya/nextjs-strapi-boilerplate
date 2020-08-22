import React, { FC } from "react";
import { Box, useColorMode } from "@chakra-ui/core";

const Container: FC = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.900" };
  const heightOfNavbar: string = "74px";

  return (
    <Box
      minH={`calc(100vh - ${heightOfNavbar})`}
      p={4}
      fontSize="sm"
      bg={bgColor[colorMode]}
    >
      <Box maxW="6xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Container;
