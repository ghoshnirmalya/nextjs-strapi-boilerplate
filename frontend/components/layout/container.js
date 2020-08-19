import { Box, useColorMode } from "@chakra-ui/core";
import React from "react";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.900" };

  return (
    <Box minH="100vh" p={4} fontSize="sm" bg={bgColor[colorMode]}>
      <Box maxW="2xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Container;
