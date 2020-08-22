import React, { FC } from "react";
import { Icon, Flex, Button, Stack, Box } from "@chakra-ui/core";
import Link from "next/link";
import { signIn } from "next-auth/client";

interface IProps {
  message?: string;
}

const AccessDeniedIndicator: FC<IProps> = ({
  message = "You need to Sign In to view this content!",
}) => {
  const iconNode = () => {
    return <Icon name="warning-2" color="purple" size="50px" />;
  };

  const signInButtonNode = () => {
    return (
      <Link href="/api/auth/signin">
        <Button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          {message}
        </Button>
      </Link>
    );
  };

  return (
    <Flex justifyContent="center" alignItems="center" h="200px">
      <Stack spacing={4} align="center">
        <Box>{iconNode()}</Box>
        <Box>{signInButtonNode()}</Box>
      </Stack>
    </Flex>
  );
};

export default AccessDeniedIndicator;
