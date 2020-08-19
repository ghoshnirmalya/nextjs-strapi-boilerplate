import { Box, Stack, Text, useColorMode } from "@chakra-ui/core";
import React from "react";

const Feed = ({ feed }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  const authorNode = () => {
    return (
      <Stack
        spacing={4}
        isInline
        alignItems="center"
        p={4}
        borderBottomWidth={1}
        borderColor={borderColor[colorMode]}
      >
        <Stack>
          <Text fontWeight="bold">{feed.author.username}</Text>
        </Stack>
      </Stack>
    );
  };

  const bodyNode = () => {
    return (
      <Text fontSize="md" p={4}>
        {feed.body}
      </Text>
    );
  };

  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Stack spacing={0}>
        {authorNode()}
        {bodyNode()}
      </Stack>
    </Box>
  );
};

export default Feed;
